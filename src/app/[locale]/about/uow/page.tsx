import React from 'react';

import { Heading, Flex, Text, Button,  Avatar, RevealFx } from '@/once-ui/components';
import { Projects } from '@/components/work/Projects';
import { Certificates } from '@/components/about/Certificates';

import { ProjectCard } from '@/components';

import { baseURL, routes, renderContent } from '@/app/resources'; 
import { Mailchimp } from '@/components';
import { Posts } from '@/components/blog/Posts';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { useTranslations } from 'next-intl';

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
	const { home, about, person, newsletter, certificate} = renderContent(t);
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
							name: person.name,
							image: {
								'@type': 'ImageObject',
								url: `${baseURL}${person.avatar}`,
							},
						},
					}),
				}}
			/>
			<Flex
				fillWidth
				direction="column"
				paddingTop="l" gap="m"
                paddingBottom='0'
                style={{paddingBottom: '0px'}} 
                >
					<Flex
						direction="column"
						fillWidth maxWidth="s" gap="xs">
							<Heading
								wrap="balance"
								variant="display-strong-s">
								{certificate.title}
							</Heading>
							<Text
								wrap="balance"
								onBackground="neutral-weak"
								variant="body-default-l">
								{certificate.description}
							</Text>
							<Text
                                paddingBottom='s'
                                style={{ width: '400px' }} 
								wrap="balance"
								onBackground="neutral-weak"
								variant="body-default-s">
								{certificate.program}
							</Text>
                            <Button
                                key={certificate.link}
                                href={certificate.link}
                                label={certificate.buttonname}
                                size="s"
                                variant="tertiary"
                            />
					</Flex>
				
			</Flex>
            <Certificates range={[1,1]} locale={locale}/>
			{ newsletter.display &&
				<Mailchimp newsletter={newsletter} />
			}
		</Flex>
	);
}
