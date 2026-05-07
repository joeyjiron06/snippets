'use client'

import {
  SearchDialog,
  SearchDialogClose,
  SearchDialogContent,
  SearchDialogHeader,
  SearchDialogIcon,
  SearchDialogInput,
  SearchDialogList,
  SearchDialogListItem,
  SearchDialogOverlay,
  type SharedProps,
} from 'fumadocs-ui/components/dialog/search'
import { useDocsSearch } from 'fumadocs-core/search/client'
import { create } from '@orama/orama'
import { useI18n } from 'fumadocs-ui/contexts/i18n'
import searchMeta from '@/content/site/search-meta.json'

function initOrama() {
  return create({
    schema: {
      _: 'string',
    },
    language: 'english',
  })
}

export default function DefaultSearchDialog(props: SharedProps) {
  const { locale } = useI18n()
  const { search, setSearch, query } = useDocsSearch({
    type: 'static',
    initOrama,
    locale,
  })

  const items = query.data && query.data !== 'empty' ? dedupeSearchItems(query.data) : null

  return (
    <SearchDialog search={search} onSearchChange={setSearch} isLoading={query.isLoading} {...props}>
      <SearchDialogOverlay />
      <SearchDialogContent>
        <SearchDialogHeader>
          <SearchDialogIcon />
          <SearchDialogInput />
          <SearchDialogClose />
        </SearchDialogHeader>
        <SearchDialogList
          items={items}
          Item={({ item, onClick }) => {
            if (item.type === 'action') {
              return <SearchDialogListItem item={item} onClick={onClick} />
            }

            const meta = searchMeta[item.url as keyof typeof searchMeta]

            return (
              <SearchDialogListItem item={item} onClick={onClick}>
                <div className="flex min-w-0 flex-col gap-1">
                  <div className="font-medium text-fd-popover-foreground">{meta?.title ?? item.url}</div>
                  <div className="line-clamp-2 text-xs text-fd-muted-foreground">
                    {meta?.description ?? ''}
                  </div>
                </div>
              </SearchDialogListItem>
            )
          }}
        />
      </SearchDialogContent>
    </SearchDialog>
  )
}

function dedupeSearchItems<T extends { id: string; url?: string; type?: string }>(items: T[]) {
  const seen = new Set<string>()

  return items.filter((item) => {
    if (item.type === 'action' || !item.url) return true
    if (seen.has(item.url)) return false
    seen.add(item.url)
    return true
  })
}
