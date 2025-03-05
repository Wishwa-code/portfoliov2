import React from 'react'
import NextLink from 'next/link'
import { getRoute } from '@/app/[locale]/about/Link/2_getRoute'
import { ConditionalWrapper } from '@/app/[locale]/about/Link/3_ConditionalWrapper'

const Link = ({ href, external = false, children, ...rest }) => {
  const hrefPath = typeof href === 'object' ? getRoute(href) : href
  const hrefAttribute = external ? { href: hrefPath } : {}

  const linkElement = (
    <NextLink legacyBehavior
      {...hrefAttribute}
      target={external && !hrefPath.match('^mailto:|^tel:') ? '_blank' : null}
      rel={external ? 'noopener noreferrer' : null}
      {...rest}
      href={hrefPath}
    >
      {children}
    </NextLink>
  );

  return (
    <ConditionalWrapper
      condition={!external}
    //   wrapper={(children) => (
    //     <NextLink href={hrefPath} scroll={false}>
    //       {children}
    //     </NextLink>
    //   )}
    >
      {linkElement}
    </ConditionalWrapper>
  )
}

export default Link