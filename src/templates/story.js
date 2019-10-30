import React from 'react'
import Layout from '../components/Layout'

export default ({pageContext: {data}}) => (
    <Layout>
        <h1>{data.Story_Name}</h1>
    </Layout>
)
