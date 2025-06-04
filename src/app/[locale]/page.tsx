import React from 'react';

import { Heading, Flex, Text, Button,  Avatar, RevealFx } from '@/once-ui/components';
import { Projects } from '@/components/work/Projects';

import { baseURL, routes, renderContent } from '@/app/resources'; 
import { LandingPage, Mailchimp } from '@/components';
import { Posts } from '@/components/blog/Posts';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import styles from './app.module.scss'


export async function generateMetadata(
	{params: {locale}}: { params: { locale: string }}
) {
	const t = await getTranslations();
    const { home } = renderContent(t);
	const title = home.title;
	const description = home.description;
	const ogImage = `https://${baseURL}/og?title=${encodeURIComponent(title)}`;

	return {
		title,
		description,
		openGraph: {
			title,
			description,
			type: 'website',
			url: `https://${baseURL}/${locale}`,
			images: [
				{
					url: ogImage,
					alt: title,
				},
			],
		},
		twitter: {
			card: 'summary_large_image',
			title,
			description,
			images: [ogImage],
		},
	};
}

export default function Home(
	{ params: {locale}}: { params: { locale: string }}
) {
	setRequestLocale(locale);
	const t = useTranslations();
	const { home, about, person, newsletter } = renderContent(t);
	return (
		<Flex
			maxWidth="m" fillWidth gap="xl"
			direction="column" alignItems="center">
			<script
				type="application/ld+json"
				suppressHydrationWarning
				dangerouslySetInnerHTML={{
					__html: JSON.stringify({
						'@context': 'https://schema.org',
						'@type': 'WebPage',
						name: home.title,
						description: home.description,
						url: `https://${baseURL}`,
						image: `${baseURL}/og?title=${encodeURIComponent(home.title)}`,
						publisher: {
							'@type': 'Person',
							name: person.firstName,
							image: {
								'@type': 'ImageObject',
								url: `${baseURL}${person.avatar}`,
							},
						},
					}),
				}}
			/>			
			{/* <Flex
			    className={styles.landingImage}
				>
				<img src="/images/sunrise.jpg" alt="Landing" className={styles.coverImage} />
				<img src="/images/sunrise.jpg" alt="Overlay" className={styles.overlayImage} />
			</Flex> */}
				<LandingPage range={[1,1]} locale={locale}/>
				

			<Flex
				className={styles.contentContainer}
				fillWidth
				direction="column"
				paddingY="0" gap="m">
					<Flex
						direction="column"
						fillWidth maxWidth="s" gap="m">
					</Flex>
				
			</Flex>
			<RevealFx translateY="16" >
				<Projects range={[1,1]} locale={locale}/>
			</RevealFx>
			{routes['/blog'] && (
				<>
				<Flex
					className={styles.homeBlogGap}
					fillWidth
					direction="column"
					paddingY="l" gap="m">
						<Flex
							direction="column"
							fillWidth maxWidth="s" gap="m">
						</Flex>
				</Flex>
				
				<Flex 
				alignItems='center'
				// marginTop='48'
				justifyContent='center'
				background="surface"
				radius="l-4"
				fillWidth gap="24" mobileDirection="column">
					<Flex flex={1} className={styles.blogLeftGap}>
						<Heading as="h2" variant="display-strong-xs" wrap="balance">
						Latest from the blog
						</Heading>
					</Flex>
					<Flex alignItems='center' flex={3} paddingLeft="80" paddingTop='20'>
						<Posts range={[1,1]} columns="1" locale={locale}/>
					</Flex>
				</Flex>
				</>
			)}
			{/* <Projects range={[2]} locale={locale}/> */}
			{ newsletter.display &&
				<Mailchimp newsletter={newsletter} />
			}
		</Flex>
	);
}
