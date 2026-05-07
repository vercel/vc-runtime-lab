const repoUrl = 'https://github.com/vercel/vc-runtime-lab/blob/main';

export function codeLinks(hostPath: string, remotePath: string) {
  return {
    host: `${repoUrl}/${hostPath}`,
    remote: `${repoUrl}/${remotePath}`,
  };
}
