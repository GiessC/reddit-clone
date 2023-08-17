import React from 'react';
import styles from './Post.module.scss';
import { DateTime, Duration } from 'luxon';

const timestampDisplay = (timestamp?: DateTime | null) => {
    if (!timestamp)
        return null;
    
    const duration = timestamp.diffNow('milliseconds', { conversionAccuracy: 'casual' }).negate().rescale();
    
    const days = duration.days;
    const hours = duration.hours;
    const minutes = duration.minutes;
    const seconds = duration.seconds;

    if (days > 0)
        return `${days} days ago`;
    if (hours > 0)
        return `${hours} hours ago`;
    if (minutes > 0)
        return `${minutes} minutes ago`;
    if (seconds > 0)
        return `${seconds} seconds ago`;
    return 'just now';
};

const Post = ({ post }: PostProps) => {
    const [createdAt, setCreatedAt] = React.useState<DateTime | null>(null);
    const [updatedAt, setUpdatedAt] = React.useState<DateTime | null>(null);
    
    React.useEffect(() => {
        if (!post.createdAt || !post.updatedAt)
            return;
        setCreatedAt(DateTime.fromISO(post.createdAt));
        setUpdatedAt(DateTime.fromISO(post.updatedAt));
    }, [post.createdAt, post.updatedAt]);
    
    return (
        <div className={styles.Post}>
            <div className={styles.PostHeader}>
                <h2>{post.title}</h2>
                <a href={`/users/${post.creator}`}>{post.creator}</a>
                <span>
                    {
                        post.createdAt !== post.updatedAt
                        ?
                        `${timestampDisplay(updatedAt)} (edited)`
                        :
                        timestampDisplay(createdAt)
                    }
                </span>
            </div>
            <div className={styles.PostBody}>
                <p>{post.body}</p>
            </div>
        </div>
    );
};

export default Post;