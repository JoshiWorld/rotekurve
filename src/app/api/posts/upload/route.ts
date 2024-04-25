import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { Readable } from 'stream';
import { env } from '@/env';
import { NextRequest, NextResponse } from 'next/server';

const s3Client = new S3Client({
  region: env.S3_REGION,
  credentials: {
    accessKeyId: env.S3_ACCESS_KEY,
    secretAccessKey: env.S3_SECRET_KEY,
  }
});

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file");

    if(!file) {
		return NextResponse.json( { error: "File is required."}, { status: 400 } );
	}
    
    // @ts-expect-error || file.arrayBuffer() is always there, when a file is delivered
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-argument
    const buffer = Buffer.from(await file.arrayBuffer());
    // @ts-expect-error || its always true
    const fileName = `posts/${Date.now()}-${file.name}`;

    const uploadParams = {
      Bucket: env.S3_BUCKET_NAME,
      Key: `${fileName}`,
      Body: buffer,
      ContentType: 'image/jpg',
    };

    const command = new PutObjectCommand(uploadParams);
    await s3Client.send(command);

    return NextResponse.json( { success: true, fileName }, { status: 200 } );
  } catch (error) {
    console.error('Error uploading file to S3:', error);
    return NextResponse.json( { error: "Internal Server error" }, { status: 500 } );
  }
}
