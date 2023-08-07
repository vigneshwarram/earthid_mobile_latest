
import AWS from 'aws-sdk';

//AWS S3 bucket
const bucketName = 'idv-sessions'
// AWS credentials
const accessKey = 'AKIAU4JK3LMEAKCXLXWE';
const secretKey = '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';

AWS.config.update({
  accessKeyId: accessKey,
  secretAccessKey: secretKey,
});


export async function createUserSpecificBucket(username:any) {
    try {
      const s3 = new AWS.S3();
      
      // Generate a unique bucket name based on the username (you can modify this as needed).
      const bucketName = `idv-sessions-${username.toLowerCase()}`;
  
      const params = {
        Bucket: bucketName,
        ACL: 'private', // Set ACL to 'private' if you want to restrict access to the bucket.
      };
  
      // Create the bucket
      const news3 = await s3.createBucket(params).promise();
      console.log("bucketcreated",news3);
      
      return bucketName;
    } catch (error) {
      console.error('Error creating user-specific bucket:', error);
      return null;
    }
  }

  export function mapCountryCodeToRegion(countryCode:any) {
    const countryToRegionMap : any = {
      'US': 'us-west-2', // Example region mapping for the United States
      'IN': 'ap-south-1', // Example region mapping for India
      // Add more region mappings as needed
    };
  
    return countryToRegionMap[countryCode] || 'us-west-2'; // Default to a region (e.g., us-west-2) if not found in the map
  }

  export async function generatePreSignedURL(bucketName:any, objectKeys:any, expirationInSeconds = 3600) {
    try {
      const s3 = new AWS.S3({ signatureVersion: 'v4' });
  
      const params = {
        Bucket: bucketName,
        Key: objectKeys,
        Expires: expirationInSeconds,
      };
  
      const url = await s3.getSignedUrlPromise('getObject', params);
  
      return url;
    } catch (error) {
      console.error('Error generating pre-signed URL:', error);
      return null;
    }
  }

  export async function uploadImageToS3(bucketName:any, objectKey:any,base64Image:any) {
    try {
      const s3 = new AWS.S3();
  
      const params = {
        Bucket: bucketName,
        Key: objectKey,
        // Body: {
        //   uri: imageUri,
        // },
        Body: Buffer.from(base64Image, 'base64'),
       // ACL: 'public-read', // Set ACL to 'public-read' to make the uploaded image publicly accessible
      };

      console.log("fromhere",params);      
      const result = await s3.upload(params).promise();
      console.log('Image uploaded successfully:', result);
      return result.Key;
    } catch (error) {
      console.error('Error uploading image to S3:', error);
      return null;
    }
  }
  
