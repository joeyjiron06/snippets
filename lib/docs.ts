import { source } from '@/lib/source'
import { getCategoryLabel } from '@/lib/site'
import type { Folder, Item, Node, Root } from 'fumadocs-core/page-tree'

function getPageTimestamp(item: Item) {
  const ref = item.$ref
  if (!ref) return 0

  const page = source.getPages().find((entry) => entry.path === ref)
  if (!page) return 0

  return page.data.updatedDate.valueOf()
}

function sortNodes(children: Node[]): Node[] {
  return [...children]
    .map((node) => cloneNode(node))
    .sort((a, b) => {
      if (a.type === 'folder' && b.type === 'folder') {
        return String(a.name).localeCompare(String(b.name))
      }

      if (a.type === 'folder') return -1
      if (b.type === 'folder') return 1
      if (a.type === 'separator' && b.type === 'separator') return 0
      if (a.type === 'separator') return 1
      if (b.type === 'separator') return -1

      return getPageTimestamp(b) - getPageTimestamp(a)
    })
}

function cloneNode(node: Node): Node {
  if (node.type === 'folder') {
    return {
      ...node,
      name: typeof node.name === 'string' ? getCategoryLabel(node.name) : node.name,
      children: sortNodes(node.children),
      index: node.index ? ({ ...node.index } satisfies Item) : node.index,
    }
  }

  if (node.type === 'page') {
    return { ...node }
  }

  return { ...node }
}

export function getDocsTree(): Root {
  const tree = source.getPageTree()

  return {
    ...tree,
    children: sortNodes(tree.children),
  }
}
