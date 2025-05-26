import { Avatar, Button, Flex, Heading, Icon, IconButton, SmartImage, Tag, Text, SmartLink, DialogBox, Tooltip} from '@/once-ui/components';
import { baseURL, renderContent } from '@/app/resources';
import TableOfContents from '@/components/about/TableOfContents';
import styles from '@/components/about/about.module.scss'
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import  SendEmailButton from '../../../components/about/Handlemail';
import {RotatingTextBox} from '@/components';
import ScrollReveal from '@/reactbits/scrollreveal/scrollReveal';
import ExperienceGraph from '@/reactbits/experienceGraph/experienceGraph';
import { TechnicalTitle } from '@/components/about/technicalSkillsTitle';
import { Libraries } from '@/components/about/librariesList';
import { Languages } from '@/components/about/languagesList';


// import Link from 'next/link'

export async function generateMetadata(
    {params: {locale}}: { params: { locale: string }}
) {
    const t = await getTranslations();
    const {person, about, social, } = renderContent(t);
	const title = about.title;
	const description = about.description;
	const ogImage = `https://${baseURL}/og?title=${encodeURIComponent(title)}`;

	return {
		title,
		description,
		openGraph: {
			title,
			description,
			type: 'website',
			url: `https://${baseURL}/${locale}/blog`,
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

export default function About(
    { params: {locale}}: { params: { locale: string }}
    
) {
    console.log('locale here',locale);


    setRequestLocale(locale);
    const t = useTranslations();
    const {person, about, social } = renderContent(t);
    const structure = [
        { 
            title: about.intro.title,
            display: about.intro.display,
            items: []
        },
        { 
            title: about.work.title,
            display: about.work.display,
            items: about.work.experiences.map(experience => experience.company)
        },
        { 
            title: about.studies.title,
            display: about.studies.display,
            items: about.studies.institutions.map(institution => institution.name)
        },
        
        { 
            title: about.technical.title,
            display: about.technical.display,
            items: about.technical.skills.map(skill => skill.title)
        },
    ]
    

    const handleMailto = (e:any) => {
        e.preventDefault();
        const email = "example@email.com";
        const mailto = `mailto:${email}`;
        window.location.href = mailto;
    };



    return (
        <Flex
            fillWidth maxWidth="m"
            direction="column">
            <script
                type="application/ld+json"
                suppressHydrationWarning
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        '@context': 'https://schema.org',
                        '@type': 'Person',
                        name: person.name,
                        jobTitle: person.role,
                        description: about.intro.description,
                        url: `https://${baseURL}/about`,
                        image: `${baseURL}/images/${person.avatar}`,
                        sameAs: social
                            .filter((item) => item.link && !item.link.startsWith('mailto:')) // Filter out empty links and email links
                            .map((item) => item.link),
                        worksFor: {
                            '@type': 'Organization',
                            name: about.work.experiences[0].company || ''
                        },
                    }),
                }}
            />
            {/* { about.tableOfContent.display && (
                <Flex
                    style={{ left: '0', top: '50%', transform: 'translateY(-50%)' }}
                    position="fixed"
                    paddingLeft="24" gap="32"
                    direction="column" hide="s">
                    <TableOfContents
                        structure={structure}
                        about={about} />
                </Flex>
            )} */}
            <Flex
                fillWidth
                mobileDirection="column" justifyContent="start">
                
                <Flex
                    className={styles.blockAlign}
                    fillWidth flex={9}  direction="column">
                    <Flex
                       direction="row"
                       justifyContent='center'>
                        { about.avatar.display && (
                        <Flex
                            minWidth="160" paddingX="l" paddingBottom="xl" gap="m"
                            flex={3} direction="column" alignItems="center">
                            <Avatar
                                src={person.avatar}
                                size="xl"/>
                            <Flex
                                gap="8"
                                alignItems="center">
                                <Icon
                                    onBackground="accent-weak"
                                    name="globe"/>
                                {person.location}
                            </Flex>
                            { person.languages.length > 0 && (
                                <Flex
                                    wrap
                                    gap="8">
                                    {person.languages.map((language, index) => (
                                        <Tag
                                            key={index}
                                            size="l">
                                            {language}
                                        </Tag>
                                    ))}
                                </Flex>
                            )}
                        </Flex>
                        )}
                    
                        <Flex
                            id={about.intro.title}
                             flex={6} 
                            direction="column" justifyContent="center"
                            marginBottom="16">
                            {about.calendar.display && (
                                <Flex
                                    marginBottom="l"

                                    >
                                <Button
                                    data-border="rounded"
                                    href={about.calendar.link}
                                    variant="tertiary"
                                    suffixIcon="chevronRight"
                                    style={{
                                        backdropFilter: 'blur(var(--static-space-1))',
                                        border: '1px solid var(--brand-alpha-medium)',
                                        width: 'fit-content'
                                    }}
                                    size="m">
                                    <Flex 
                                    direction="row"
                                    alignItems='center'>
                                        <Flex paddingLeft="12">
                                            <Icon
                                                name="calendar"
                                                onBackground="brand-weak"/>
                                        </Flex>
                                        <Flex
                                            paddingX="8">
                                            Schedule a call
                                        </Flex>
                                            </Flex>
                                    
                                </Button>
                                </Flex>
                            )}
                            <Heading
                                className={styles.textAlign}
                                variant="display-strong-xl"
                                marginBottom="24">
                                {person.name}
                            </Heading>
                            {/* <Text
                                className={styles.textAlign}
                                variant="display-default-xs"
                                onBackground="neutral-weak"
                                marginBottom="24">
                                {person.role}
                            </Text> */}
                            <RotatingTextBox locale={locale}/>
                            
                            {/* {social.length > 0 && (
                                <Flex
                                    paddingTop="20" marginBottom="40" gap="8" wrap>
                                    {social.map((item) => (
                                        item.link && (
                                            <Button
                                                key={item.name}
                                                href={item.link}
                                                prefixIcon={item.icon}
                                                label={item.name}
                                                size="s"
                                                variant="tertiary"/>
                                        )
                                    ))}                           
                                    <DialogBox title="Hello there 🫰">
                                        Content goes here
                                    </DialogBox>
                                </Flex>
                            )} */}
                            <Flex 
                            height="40">

                            </Flex>
                            { about.intro.display && (
                    
                                <ScrollReveal>
                                {about.intro.description.props.children}
                                </ScrollReveal>
                            )}

                        </Flex>
                    </Flex>
                    {/* <Flex
                            direction="column"
                            textVariant="body-default-l"
                            fillWidth gap="m" marginBottom="40">
                            {about.intro.description}
                        </Flex> */}

                    
                    
                    

                    { about.technical.display && (
                        <>  <Heading
                                    paddingTop='80'
                                    as="h2"
                                    id={about.technical.title}
                                    variant="display-strong-s" marginBottom="4">
                                    {about.technical.title}
                            </Heading>
                            <TechnicalTitle locale={locale} />
                            <ExperienceGraph/>
                            <Libraries locale={locale}/>
                            <Languages locale={locale}/>
                            {/* <Flex
                                direction="column"
                                fillWidth gap="l" marginTop="32" marginBottom="40">
                                {about.technical.skills.map((skill, index) => (
                                    <Flex
                                        key={`${skill}-${index}`}
                                        fillWidth gap="2"
                                        direction="column">
                                        <Text
                                            variant="heading-strong-l">
                                            {skill.title}
                                        </Text>
                                        <Text
                                            variant="body-default-m"
                                            onBackground="neutral-weak">
                                            {skill.description}
                                        </Text>
                                        {skill.images.length > 0 && (
                                            <Flex
                                                fillWidth paddingTop="m" gap="12"
                                                wrap>
                                                {skill.images.map((image, index) => (
                                                    <Flex
                                                        key={index}
                                                        border="neutral-medium"
                                                        borderStyle="solid-1"
                                                        radius="m"
                                                        minWidth={image.width} height={image.height}>
                                                        <SmartImage
                                                            enlarge
                                                            radius="m"
                                                            sizes={image.width.toString()}
                                                            alt={image.alt}
                                                            src={image.src}/>
                                                    </Flex>
                                                ))}
                                            </Flex>
                                        )}
                                    </Flex>
                                ))}
                            </Flex> */}
                        </>
                    )}
                    <Flex direction='column' alignItems='center' >
                    { about.studies.display && (
                        <>
                            <Heading
                                paddingTop='80'
                                as="h2"
                                id={about.studies.title}
                                variant="display-strong-s"
                                style={{width: '33.5vw'}}
                                marginBottom="m">
                                {about.studies.title}
                            </Heading>
                            <Flex
                                direction="column"
                                fillWidth gap="l" marginBottom="40" 
                                style={{marginLeft: '20vw'}}
                                >
                                {about.studies.institutions.map((institution, index) => (
                                    <Flex
                                        key={`${institution.name}-${index}`}
                                        fillWidth gap="4"
                                        direction="column">
                                        <Text
                                            //@ts-ignore
                                            id={institution.name}
                                            //@ts-ignore
                                            variant="heading-strong-l">
                                            {institution.name}
                                        </Text>
                                        <Text
                                            //@ts-ignore
                                            id={institution.faculty}
                                            //@ts-ignore
                                            variant="heading-default-s">{institution.faculty}
                                        </Text>
                                        <Text
                                            variant="heading-default-xs"
                                            onBackground="neutral-weak">
                                            {institution.description}
                                        </Text>
                                        <SmartLink
                                            suffixIcon="chevronRight"
                                            style={{margin: '0', width: 'fit-content',padding: '0'}}
                                            //@ts-ignore
                                            href={institution.link}>
                                                
                                                <Text 
                                                //@ts-ignore
                                                variant="body-default-s">{institution.label}
                                                </Text>
                                        </SmartLink>
                                    </Flex>
                                ))}
                            </Flex>
                        </>
                    )}
                    { about.certificates.display && (
                        <>
                            <Heading
                                paddingTop='80'
                                as="h2"
                                id={about.certificates.title}
                                variant="display-strong-s"
                                style={{width: '33.5vw'}}
                                marginBottom="m">
                                {about.certificates.title}
                            </Heading>
                            <Flex
                                direction="column"
                                fillWidth gap="l" marginBottom="40" 
                                style={{marginLeft: '20vw'}}
                                >
                                {about.certificates.institutions.map((institution, index) => (
                                    <Flex
                                        key={`${institution.name}-${index}`}
                                        fillWidth gap="4"
                                        direction="column">
                                        <Text
                                            //@ts-ignore
                                            id={institution.name}
                                            //@ts-ignore
                                            variant="heading-strong-l">
                                            {institution.name}
                                        </Text>
                                        {/* <Text
                                            //@ts-ignore
                                            id={institution.faculty}
                                            //@ts-ignore
                                            variant="heading-default-s">{institution.faculty}
                                        </Text> */}
                                        { (institution.credentialID  != '-') && 
                                        <Text
                                            variant="heading-default-xs"
                                            onBackground="neutral-weak">
                                            Credential ID : {institution.credentialID}
                                        </Text>
                                        }
                                        <SmartLink
                                            suffixIcon="chevronRight"
                                            style={{margin: '0', width: 'fit-content',padding: '0'}}
                                            //@ts-ignore
                                            href={institution.link}>
                                                
                                                <Text 
                                                //@ts-ignore
                                                variant="body-default-s">{institution.label}
                                                </Text>
                                        </SmartLink>
                                    </Flex>
                                ))}
                            </Flex>
                        </>
                    )}

                    { about.work.display && (
                        <>
                            <Heading
                                as="h2"
                                                                paddingTop='80'

                                id={about.work.title}
                                variant="display-strong-s"
                                style={{width: '33.5vw'}}
                                marginBottom="m">
                                {about.work.title}
                            </Heading>
                            <Flex
                                direction="column"
                                fillWidth maxWidth={40} gap="l" marginBottom="40">
                                {about.work.experiences.map((experience, index) => (
                                    <Flex
                                        key={`${experience.company}-${experience.role}-${index}`}
                                        fillWidth
                                        direction="column">
                                        <Flex
                                            fillWidth
                                            justifyContent="space-between"
                                            alignItems="flex-end"
                                            marginBottom="4">
                                            <Text
                                                id={experience.company}
                                                variant="heading-strong-l">
                                                {experience.company}
                                            </Text>
                                            <Text
                                                variant="heading-default-xs"
                                                onBackground="neutral-weak">
                                                {experience.timeframe}
                                            </Text>
                                        </Flex>
                                        <Text
                                            variant="body-default-s"
                                            onBackground="brand-weak"
                                            marginBottom="m">
                                            {experience.role}
                                        </Text>
                                        <Flex
                                            as="ul"
                                            direction="column" gap="16">
                                            {experience.achievements.map((achievement: string, index: any) => (
                                                <Text
                                                    as="li"
                                                    variant="body-default-m"
                                                    key={`${experience.company}-${index}`}>
                                                    {achievement}
                                                </Text>
                                            ))}
                                        </Flex>
                                        {experience.images.length > 0 && (
                                            <Flex
                                                fillWidth paddingTop="m" paddingLeft="40"
                                                wrap>
                                                {experience.images.map((image, index) => (
                                                    <Flex
                                                        key={index}
                                                        border="neutral-medium"
                                                        borderStyle="solid-1"
                                                        radius="m"
                                                        minWidth={image.width} height={image.height}>
                                                        <SmartImage
                                                            enlarge
                                                            radius="m"
                                                            sizes={image.width.toString()}
                                                            alt={image.alt}
                                                            src={image.src}/>
                                                    </Flex>
                                                ))}
                                            </Flex>
                                        )}
                                    </Flex>
                                ))}
                            </Flex>
                        </>
                    )}
                </Flex>
                </Flex>
            </Flex>
        </Flex>
    );
}


