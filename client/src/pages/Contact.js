import React from 'react'
import cx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { motion } from 'framer-motion';
import Card from '@material-ui/core/Card';
import Box from '@mui/material/Box';
import Button from '@material-ui/core/Button';
import TextField from '@mui/material/TextField';
import CardContent from '@material-ui/core/CardContent';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import TextInfoContent from '@mui-treasury/components/content/textInfo';
import { useBlogTextInfoContentStyles } from '@mui-treasury/styles/textInfoContent/blog';
import { useN04TextInfoContentStyles } from '@mui-treasury/styles/textInfoContent/n04';
import { useOverShadowStyles } from '@mui-treasury/styles/shadow/over';
import Modal from '@mui/material/Modal';



const useStyles = makeStyles(() => ({
    root: {
        maxWidth: 500,
        margin: 'auto',
        borderRadius: 12,
        padding: 12,
        justifyContent: 'center',
    },
    media: {
        borderRadius: 6,
    },
}));

const Contact = () => {
    const styles = useStyles();
    const textCardContentStyles = useN04TextInfoContentStyles();
    const shadowStyles = useOverShadowStyles({ inactive: true });
    const { button: buttonStyles } = useBlogTextInfoContentStyles();

    // modal states open/close
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 2 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
        >

            <main>
                <Card className={cx(styles.root, shadowStyles.root)}>
                    <CardContent>
                        <TextInfoContent
                            classes={textCardContentStyles}
                            overline={'We Need To Talk...'}
                            heading={'CONTACT US'}
                            body={
                                <Box
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        flexDirection: 'column',
                                        '& > :not(style)': { m: 1 },
                                    }}
                                >
                                    <TextField id="demo-helper-text-misaligned-no-helper" label="Name" />
                                    <br />
                                    <TextField id="demo-helper-text-misaligned-no-helper" label="Email" />
                                    <br />
                                    <TextareaAutosize
                                        aria-label="empty textarea"
                                        placeholder="..."
                                        style={{ width: 300, height: 100 }}
                                    />
                                    <Button onClick={handleOpen} className={buttonStyles}>Send</Button>
                                    <Modal
                                        open={open}
                                        onClose={handleClose}
                                        aria-labelledby="modal-modal-title"
                                        aria-describedby="modal-modal-description"
                                    >
                                        <Card className={cx(styles.root, shadowStyles.root)}>
                                            <CardContent>
                                                <TextInfoContent
                                                    classes={textCardContentStyles}
                                                    heading={'THANKS FOR REACHING OUT!'}
                                                    body={
                                                        <>
                                                            <p>We will get back to you very soon :)</p>
                                                        </>
                                                    }
                                                />
                                            </CardContent>
                                        </Card>
                                    </Modal>
                                </Box>
                            }
                        />
                    </CardContent>
                </Card>
            </main>
        </motion.div>
    );
};

export default Contact