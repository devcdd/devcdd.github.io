import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { MDXLayoutRenderer } from 'pliny/mdx-components.js'
import { coreContent } from 'pliny/utils/contentlayer.js'
import { allProjects } from 'contentlayer/generated'
import type { Project } from 'contentlayer/generated'
import { components } from '@/components/MDXComponents'
import ProjectLayout from '@/layouts/ProjectLayout'
import siteMetadata from '@/articles/siteMetadata'
import JsonLd from '@/components/JsonLd'

const sortProjects = (projects: typeof allProjects) =>
  [...projects]
    .filter((project) => project.draft !== true)
    .sort((left, right) => {
      if ((right.order ?? 0) !== (left.order ?? 0)) {
        return (right.order ?? 0) - (left.order ?? 0)
      }

      return left.title.localeCompare(right.title, 'ko')
    })

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string[] }>
}): Promise<Metadata | undefined> {
  const { slug: slugSegments } = await params
  const slug = decodeURI(slugSegments.join('/'))
  const project = allProjects.find((entry) => entry.slug === slug)

  if (!project) {
    return
  }

  const imageList =
    project.images && Array.isArray(project.images) && project.images.length > 0
      ? project.images
      : [siteMetadata.socialBanner]

  return {
    title: project.title,
    description: project.summary,
    openGraph: {
      title: project.title,
      description: project.summary,
      siteName: siteMetadata.title,
      locale: 'ko_KR',
      type: 'article',
      url: './',
      images: imageList.map((img) => ({
        url: img?.includes('http') ? img : `${siteMetadata.siteUrl}${img}`,
      })),
    },
    twitter: {
      card: 'summary_large_image',
      title: project.title,
      description: project.summary,
      images: imageList,
    },
  }
}

export const generateStaticParams = async () => {
  return allProjects
    .filter((project) => project.draft !== true)
    .map((project) => ({ slug: project.slug.split('/') }))
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string[] }> }) {
  const { slug: slugSegments } = await params
  const slug = decodeURI(slugSegments.join('/'))
  const sortedProjects = sortProjects(allProjects)
  const projectIndex = sortedProjects.findIndex((entry) => entry.slug === slug)

  if (projectIndex === -1) {
    return notFound()
  }

  const prev = sortedProjects[projectIndex + 1]
  const next = sortedProjects[projectIndex - 1]
  const project = allProjects.find((entry) => entry.slug === slug) as Project
  const mainContent = coreContent(project)
  const serializedJsonLd = JSON.stringify(project.structuredData).replace(/</g, '\\u003c')

  return (
    <>
      <JsonLd id={`project-jsonld-${slug}`} json={serializedJsonLd} />
      <ProjectLayout content={mainContent} next={next} prev={prev}>
        <MDXLayoutRenderer code={project.body.code} components={components} toc={project.toc} />
      </ProjectLayout>
    </>
  )
}
