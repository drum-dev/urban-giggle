import React from 'react';
import cx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { motion } from 'framer-motion';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import TextInfoContent from '@mui-treasury/components/content/textInfo';
import { useN04TextInfoContentStyles } from '@mui-treasury/styles/textInfoContent/n04';
import { useOverShadowStyles } from '@mui-treasury/styles/shadow/over';

import Auth from '../utils/auth';
import { useQuery } from '@apollo/client';
import { GET_USER } from '../utils/queries';

const useStyles = makeStyles(() => ({
    root: {
        maxWidth: 500,
        margin: 'auto',
        borderRadius: 12,
        padding: 12,
    },
    media: {
        borderRadius: 6,
    },
}));

const DashboardUser = () => {
    const styles = useStyles();
    const textCardContentStyles = useN04TextInfoContentStyles();
    const shadowStyles = useOverShadowStyles({ inactive: true });

    
    const { loading, data } = useQuery(GET_USER, {
        variables: { userId: Auth.getProfile().data._id }
    });
    const user = data?.user || [];

    if (loading) {
        return <h2>LOADING.....</h2>
    }

    return (

        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2 }}
        >
            <main>
                <Card className={cx(styles.root, shadowStyles.root)}>
                    <CardContent>
                        <TextInfoContent
                            classes={textCardContentStyles}
                            overline={'Total Quest'}
                            heading={'User Dashboard'}
                            body={(
                                <>
                                    <div key="completedHunts">
                                        <h2>Completed Scavenger Hunts</h2>
                                        {user.completedHunts && user.completedHunts.map(hunt => (
                                            <div key={hunt._id}>
                                                <h3>{hunt.name}</h3>
                                            </div>
                                        ))}
                                    </div>
                                    <div key="foundHuntItems">
                                        <h2>Found Hunt Locations</h2>
                                        {user.foundHuntItems && user.foundHuntItems.map(item => (
                                            <div key={item._id}>
                                                <h3>{item.name}</h3>
                                            </div>
                                        ))}
                                    </div>
                                    <div key="badges">
                                        <h2>Badges</h2>
                                        {user.badges && user.badges.map(badge => (
                                            <div key={badge._id} style={{display: 'flex'}}>
                                                <div>
                                                    <h3>{badge.name}</h3>
                                                    <img src={`/img/badges/${badge.icon}`} alt={badge.icon} style={{ width: '200px', border: '1px solid black' }} />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </>
                            )}
                        />
                    </CardContent>
                </Card>
            </main>
        </motion.div >
    );
};
export default DashboardUser;