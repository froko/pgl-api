import { Octokit } from '@octokit/core';
import React, { useState } from 'react';

export const Deploy = () => {
  const [status, setStatus] = useState('');
  const success = (url: string): string =>
    `Erfolgreich. Die Website sollte in ca. 5 Minuten auf ${url} aktualisiert sein.`;
  const failure = (reason: any): string => JSON.stringify(reason);

  const deployToNetlify = (e: React.MouseEvent) => {
    e.preventDefault();
    setStatus('Bitte warten...');

    const url = process.env.NEXT_PUBLIC_NETLIFY_URL!;
    const requestOptions = {
      method: 'POST',
      headers: {},
      body: JSON.stringify('')
    };

    fetch(url, requestOptions).then(
      () => setStatus(success('https://pgl-preview.netlify.app')),
      (reason) => setStatus(failure(reason))
    );
  };

  const deployToProduction = async (e: React.MouseEvent) => {
    e.preventDefault();
    setStatus('Bitte warten...');

    const octokit = new Octokit({ auth: process.env.NEXT_PUBLIC_GITHUB_TOKEN });
    await octokit
      .request('POST /repos/{owner}/{repo}/actions/workflows/{workflow_id}/dispatches', {
        owner: 'froko',
        repo: 'pgl-homepage',
        workflow_id: 'node.js.yml',
        ref: 'main',
        headers: {
          'X-GitHub-Api-Version': '2022-11-28'
        }
      })
      .then(
        () => setStatus(success('https://pgl.ch')),
        (reason) => setStatus(failure(reason))
      );
  };

  const buttonStyles =
    'items-center mr-4 rounded-md border bg-pgl-blue px-4 py-2 font-medium text-white hover:border-pgl-blue hover:bg-white hover:text-pgl-blue hover:shadow-lg';

  return (
    <div className="container">
      <article>
        <h1>Deployment</h1>
        <button className={buttonStyles} onClick={(e) => deployToNetlify(e)}>
          Deploy to Netlify (Preview)
        </button>
        <button className={buttonStyles} onClick={(e) => deployToProduction(e)}>
          Deploy to HostFactory (Production)
        </button>
        <p>{status}</p>
      </article>
    </div>
  );
};
