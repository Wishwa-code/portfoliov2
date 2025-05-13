import { Flex, Heading, Text } from "@/once-ui/components";
// import Lottie from "lottie-react";
// import animationData from '@/../public/lotties/cofee.json';

export default function NotFound() {
    return (
        <Flex
            as="section"
            direction="column" alignItems="center">
            {/* <Lottie animationData={animationData} loop={true} /> */}
            <p>page not found</p>
        </Flex>
    )
}