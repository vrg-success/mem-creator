import { GraphQLClient } from 'graphql-request'


export const client = new GraphQLClient('https://api-euwest.graphcms.com/v1/cjt07hwk8j4o301ckrm7h5zpa/master', {
  headers: {
    Authorization: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ2ZXJzaW9uIjoxLCJ0b2tlbklkIjoiMmMwYWM1YTMtZDEzNS00MmFkLWFkNzQtMDA0ZTA4YWUwMjgzIn0.fiw-a3Ua78qKa-6sA1uZJoddyP_cfGaKCBkGDk7Vcp4',
  },
})