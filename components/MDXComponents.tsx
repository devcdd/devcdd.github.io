import type { ComponentPropsWithoutRef } from 'react'
import TOCInline from 'pliny/ui/TOCInline.js'
import Pre from 'pliny/ui/Pre.js'
import BlogNewsletterForm from 'pliny/ui/BlogNewsletterForm.js'
import type { MDXComponents } from 'mdx/types'
import CustomLink from './Link'
import TableWrapper from './TableWrapper'
import { resolveContentImagePath } from '../content-images'

const baseComponents = {
  TOCInline,
  a: CustomLink,
  pre: Pre,
  table: TableWrapper,
  BlogNewsletterForm,
}

export function getMDXComponents(assetDir?: string): MDXComponents {
  const HtmlImage = ({ src, ...rest }: ComponentPropsWithoutRef<'img'>) => {
    const resolvedSrc = typeof src === 'string' ? resolveContentImagePath(src, assetDir) : src
    return <img {...rest} src={resolvedSrc} />
  }

  const MdxImage = ({ src, ...rest }: ComponentPropsWithoutRef<'img'>) => {
    const resolvedSrc = typeof src === 'string' ? resolveContentImagePath(src, assetDir) : src
    return <img {...rest} src={resolvedSrc} />
  }

  return {
    ...baseComponents,
    img: HtmlImage,
    Image: MdxImage,
  }
}

export const components = getMDXComponents()
