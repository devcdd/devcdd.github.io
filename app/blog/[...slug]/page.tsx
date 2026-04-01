import 'css/prism.css'
import 'katex/dist/katex.css'

import { getMDXComponents } from '@/components/MDXComponents'
import { MDXLayoutRenderer } from 'pliny/mdx-components.js'
import { sortPosts, coreContent, allCoreContent } from 'pliny/utils/contentlayer.js'
import { allBlogs, allAuthors } from 'contentlayer/generated'
import type { Authors, Blog } from 'contentlayer/generated'
import PostSimple from '@/layouts/PostSimple'
import PostLayout from '@/layouts/PostLayout'
import PostBanner from '@/layouts/PostBanner'
import { Metadata } from 'next'
import siteMetadata from '@/articles/siteMetadata'
import { notFound } from 'next/navigation'
import JsonLd from '@/components/JsonLd'
import { resolveDocumentImageList } from '@/content-images'

const defaultLayout = 'PostLayout'
const layouts = {
  PostSimple,
  PostLayout,
  PostBanner,
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string[] }>
}): Promise<Metadata | undefined> {
  const { slug: slugSegments } = await params
  const slug = decodeURI(slugSegments.join('/'))
  const post = allBlogs.find((p) => p.slug === slug)
  const authorList = post?.authors || ['default']
  const authorDetails = authorList.map((author) => {
    const authorResults = allAuthors.find((p) => p.slug === author)
    return coreContent(authorResults as Authors)
  })
  if (!post) {
    return
  }

  const publishedAt = new Date(post.date).toISOString()
  const modifiedAt = new Date(post.lastmod || post.date).toISOString()
  const authors = authorDetails.map((author) => author.name)
  const imageList = resolveDocumentImageList(post.images, post.assetDir)
  const metadataImageList = imageList.length > 0 ? imageList : [siteMetadata.socialBanner]
  const ogImages = imageList.map((img) => {
    return {
      url: img?.includes('http') ? img : siteMetadata.siteUrl + img,
    }
  })

  return {
    title: post.title,
    description: post.summary,
    openGraph: {
      title: post.title,
      description: post.summary,
      siteName: siteMetadata.title,
      locale: 'en_US',
      type: 'article',
      publishedTime: publishedAt,
      modifiedTime: modifiedAt,
      url: './',
      images:
        ogImages.length > 0
          ? ogImages
          : [{ url: siteMetadata.siteUrl + siteMetadata.socialBanner }],
      authors: authors.length > 0 ? authors : [siteMetadata.author],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.summary,
      images: metadataImageList,
    },
  }
}

export const generateStaticParams = async () => {
  const paths = allBlogs.map((p) => ({ slug: p.slug.split('/') }))

  return paths
}

export default async function Page({ params }: { params: Promise<{ slug: string[] }> }) {
  const { slug: slugSegments } = await params
  const slug = decodeURI(slugSegments.join('/'))
  // Filter out drafts in production
  const sortedCoreContents = allCoreContent(sortPosts(allBlogs))
  const postIndex = sortedCoreContents.findIndex((p) => p.slug === slug)
  if (postIndex === -1) {
    return notFound()
  }

  const prev = sortedCoreContents[postIndex + 1]
  const next = sortedCoreContents[postIndex - 1]
  const post = allBlogs.find((p) => p.slug === slug) as Blog
  const authorList = post?.authors || ['default']
  const authorDetails = authorList.map((author) => {
    const authorResults = allAuthors.find((p) => p.slug === author)
    return coreContent(authorResults as Authors)
  })
  const mainContent = {
    ...coreContent(post),
    assetDir: post.assetDir,
    images: resolveDocumentImageList(post.images, post.assetDir),
  }
  const jsonLd = {
    ...post.structuredData,
    author: authorDetails.map((author) => {
      return {
        '@type': 'Person',
        name: author.name,
      }
    }),
  }
  const serializedJsonLd = JSON.stringify(jsonLd).replace(/</g, '\\u003c')

  const Layout = layouts[post.layout || defaultLayout]

  return (
    <>
      <JsonLd id={`blog-jsonld-${slug}`} json={serializedJsonLd} />
      <Layout content={mainContent} authorDetails={authorDetails} next={next} prev={prev}>
        <MDXLayoutRenderer
          code={post.body.code}
          components={getMDXComponents(post.assetDir)}
          toc={post.toc}
        />
      </Layout>
    </>
  )
}
