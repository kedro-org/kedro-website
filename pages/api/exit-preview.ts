import { NextApiResponse } from 'next';

export default async function exit(_: any, res: NextApiResponse) {
  // Exit the current user from "Preview Mode". This function accepts no args.
  res.clearPreviewData();

  // Redirect the user back to the blog homepage.
  res.writeHead(307, { Location: '/blog' });
  res.end();
}
