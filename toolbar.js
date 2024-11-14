
import { DraggableNode } from './draggableNode';
import { Box } from '@mui/material';
import InputIcon from '@mui/icons-material/Input';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import OutputIcon from '@mui/icons-material/Output';
import TextFieldsIcon from '@mui/icons-material/TextFields';

export const PipelineToolbar = () => {
    return (
        <Box
            sx={{
                backgroundColor: '#34495E',
                padding: '10px',
                color: '#fff',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center', // Center items horizontally
                alignItems: 'center',
                height: '100%', // Optional: Ensures toolbar takes up available height
            }}
        >
            <Box 
                sx={{ 
                    display: 'flex', 
                    flexWrap: 'wrap', 
                    gap: '20px', 
                    justifyContent: 'center', // Center content inside
                    alignItems: 'center' 
                }}
            >
                {/* Input Node */}
                <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column', gap: '5px' }}>
                    <DraggableNode type='customInput' label='Input' icon={<InputIcon fontSize="medium" />} />
                </Box>

                {/* LLM Node */}
                <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column', gap: '5px' }}>
                    <DraggableNode type='llm' label='LLM' icon={<SmartToyIcon fontSize="medium "/>} />
                </Box>

                {/* Output Node */}
                <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column', gap: '5px' }}>
                    <DraggableNode type='customOutput' label='Output' icon={<OutputIcon fontSize="medium" />} />
                </Box>

                {/* Text Node */}
                <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column', gap: '5px' }}>
                    <DraggableNode type='text' label='Text' icon={<TextFieldsIcon fontSize="medium" />} />
                </Box>

                {/* custom Input Node */}
                <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column', gap: '5px' }}>
                    <DraggableNode type='customInput2' label='Input2' icon={<InputIcon fontSize="medium" />} />
                </Box>

                {/* custom LLM Node */}
                <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column', gap: '5px' }}>
                    <DraggableNode type='llm2' label='LLM2' icon={<SmartToyIcon fontSize="medium "/>} />
                </Box>

                {/* custom Output Node */}
                <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column', gap: '5px' }}>
                    <DraggableNode type='customOutput2' label='Output2' icon={<OutputIcon fontSize="medium" />} />
                </Box>

                {/* custom Text Node */}
                <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column', gap: '5px' }}>
                    <DraggableNode type='text2' label='Text2' icon={<TextFieldsIcon fontSize="medium" />} />
                </Box>

                {/* custom Example Node */}
                <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column', gap: '5px' }}>
                    <DraggableNode type='example' label='Example' icon={<TextFieldsIcon fontSize="medium" />} />
                </Box>
            </Box>
        </Box>
    );
};
