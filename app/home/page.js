import Layout from '@components/ParentDrawer/Layout'
import React from 'react'
import Notification from '@components/home/notification'
import Image from 'next/image'

const Page = () => {
  return (
    <Layout>
      <Notification />
      <Image
        width={400}
        height={400}
        src="https://drive.google.com/uc?id=1BFyAQ9zis-5Et9Agjpg5cW8kpjcDMCrQ"
        alt="test"
      />
    </Layout>
  );
}

export default Page