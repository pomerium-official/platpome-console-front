import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

/**
 * /common/blob/{url}
 * url을 호출하여 blob으로 내려줍니다.
 * 예시 클라이언트 소스 )
 * <pre>const res = await fetch(
 `/api/youtubeTest?url=${encodeURIComponent(
    'https://i.ytimg.com/vi/WvSZta4zsWg/default.jpg'
  )}`
 );
 if (res.status === 200) {
  const blob = await res.blob();
  console.warn('@@@@@@@@@@@@@@@@@@@@@@@@', blob);
  const f: File = new File([blob], 'you.png');
  const response = await PrivateAdminApi.file.uploadAttachFileUsingPost(
    {
      regId: 0,
      subPath: 'youtube',
    },
    { file: f }
  );
  console.warn(response);
}
 </pre>
 * @author 황세준
 * @param req
 * @param res
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const url = req.query.url as string;
  await axios({
    url,
    method: 'GET',
    responseType: 'arraybuffer',
  })
    .then((response) => {
      res.setHeader('content-type', response.headers['content-type']);
      res.status(200).send(response.data);
    })
    .catch((error) => {
      res.status(error.status).send(error);
    });
}
