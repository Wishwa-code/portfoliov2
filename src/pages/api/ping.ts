// const mailchimpTx = require("mailchimp_transactional")("md--FpzgSW-VKOK93W4rsHn3w");

// export default async function handler(req, res) {
//   if (req.method === 'GET') {
//     try {
//       const response = await mailchimpTx.users.ping();
//       res.status(200).json(response);
//     } catch (error) {
//       res.status(500).json({ error: error.message });
//     }
//   } else {
//     res.setHeader('Allow', ['GET']);
//     res.status(405).end(`Method ${req.method} Not Allowed`);
//   }
// }

import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }

    const MailchimpKey = '21499c923788114fabca65ca34eab03f-us14';
    const MailchimpServer = 'us14';
    const MailchimpAudience = '62d9e0c460';

    if (!MailchimpKey || !MailchimpServer || !MailchimpAudience) {
      throw new Error('Missing Mailchimp environment variables');
    }

    const customUrl = `https://${MailchimpServer}.api.mailchimp.com/3.0/lists/${MailchimpAudience}/members`;

    const response = await fetch(customUrl, {
      method: 'POST',
      headers: {
        Authorization: `apikey ${MailchimpKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email_address: email,
        status: 'subscribed',
      }),
    });

    console.log('mailchimp_response',response)
    if (!response.ok) {
      const errorData = await response.json();
      return res.status(response.status).json({ error: errorData.detail });
    }

    const received = await response.json();
    return res.status(200).json(received);
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}

// const response = await fetch(customUrl, {
//     method: 'POST',
//     headers: {
//       Authorization: `apikey ${MailchimpKey}`,
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({
//       email_address: email,
//       status: 'subscribed',
//     }),
//   });