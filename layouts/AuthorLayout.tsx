import { ReactNode } from 'react'
import type { Authors } from 'contentlayer/generated'
import MobileContentInset from '@/components/MobileContentInset'
import SocialIcon from '@/components/social-icons'
import Image from '@/components/Image'

interface Props {
  children: ReactNode
  content: Omit<Authors, '_id' | '_raw' | 'body'>
}

export default function AuthorLayout({ children, content }: Props) {
  const { name, avatar, occupation, company, email, twitter, linkedin, github } = content

  return (
    <MobileContentInset>
      <div className="space-y-8">
        <section className="border-b border-[color:var(--border)] pb-8">
          <p className="eyebrow">About</p>
          <div className="mt-4 grid gap-8 xl:grid-cols-[18rem_minmax(0,1fr)]">
            <div className="border-b border-[color:var(--border)] pb-6 text-center xl:border-b-0 xl:border-r xl:pb-0 xl:pr-8">
              {avatar && (
                <Image
                  src={avatar}
                  alt="avatar"
                  width={192}
                  height={192}
                  className="mx-auto h-40 w-40 object-cover"
                />
              )}
              <h1 className="mt-5 font-display text-2xl font-bold tracking-tight text-[color:var(--copy-strong)] sm:text-3xl">
                {name}
              </h1>
              {occupation && <p className="mt-2 text-[color:var(--copy-muted)]">{occupation}</p>}
              {company && <p className="text-[color:var(--copy-muted)]">{company}</p>}
              <div className="mt-6 flex gap-3">
                <SocialIcon kind="mail" href={`mailto:${email}`} size={5} />
                <SocialIcon kind="github" href={github} size={5} />
                <SocialIcon kind="linkedin" href={linkedin} size={5} />
                <SocialIcon kind="x" href={twitter} size={5} />
              </div>
            </div>
            <div className="prose max-w-none dark:prose-invert">{children}</div>
          </div>
        </section>
      </div>
    </MobileContentInset>
  )
}
