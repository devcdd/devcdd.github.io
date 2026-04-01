import Card from '@/components/Card'
import MobileContentInset from '@/components/MobileContentInset'
import { allProjects } from 'contentlayer/generated'
import { genPageMetadata } from 'app/seo'
import { resolveDocumentImageList } from '@/content-images'

export const metadata = genPageMetadata({ title: 'Projects' })

const sortProjects = (projects: typeof allProjects) =>
  [...projects]
    .filter((project) => project.draft !== true)
    .sort((left, right) => {
      if ((right.order ?? 0) !== (left.order ?? 0)) {
        return (right.order ?? 0) - (left.order ?? 0)
      }

      return left.title.localeCompare(right.title, 'ko')
    })

export default function Projects() {
  const projects = sortProjects(allProjects)

  return (
    <MobileContentInset>
      <div className="space-y-8">
        <section className="border-b border-[color:var(--border)] pb-8">
          <p className="eyebrow">Projects</p>
          <h1 className="mt-4 font-display text-3xl font-bold tracking-tight text-[color:var(--copy-strong)] sm:text-4xl">
            직접 만든 제품과 실험들
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-8 text-[color:var(--copy-muted)] sm:text-lg">
            아이디어를 빠르게 형태로 만드는 과정에서 얻은 인사이트를 프로젝트 단위로 정리합니다.
            작은 서비스라도 끝까지 배포해보는 편을 선호합니다.
          </p>
        </section>

        <section className="grid gap-6 lg:grid-cols-2">
          {projects.map((project) => (
            <Card
              key={project.path}
              title={project.title}
              description={project.summary}
              imgSrc={resolveDocumentImageList(project.images, project.assetDir)[0]}
              href={`/${project.path}`}
              externalHref={project.href}
              self={project.self}
            />
          ))}
        </section>
      </div>
    </MobileContentInset>
  )
}
