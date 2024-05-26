import React, {PropsWithChildren} from 'react';
import {Box} from '@interchain-ui/react';

const VStack = ({children, spacing = 2, align = 'center', ...props}: PropsWithChildren & {
    spacing?: number,
    align?: string
}) => {
    return (
        <Box
            display="flex"
            flexDirection="column"
            alignItems={align}
            gap={spacing + 'px'}
            {...props}
        >
            {children}
        </Box>
    );
};

export default VStack;