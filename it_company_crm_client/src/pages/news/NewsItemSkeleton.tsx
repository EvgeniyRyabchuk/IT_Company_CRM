import React from 'react';
import CardHeader from "@mui/material/CardHeader";
import Skeleton from "@mui/material/Skeleton";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import {NewsItem} from "../../assets/components/News";

const NewsItemSkeleton : React.FC<{alignment: any,  children?: JSX.Element|JSX.Element[]}>= ({alignment}) => {
    return (
        <NewsItem
            sx={{
                py: 3,
                px: 1,
            }}
            /*
             // @ts-ignore */
            alignment={alignment}
        >
            <CardHeader
                avatar={
                    <Skeleton variant="circular">
                        <Avatar />
                    </Skeleton>
                }
                action={
                    <IconButton aria-label="settings">
                        <Skeleton />
                    </IconButton>
                }
                title={<Skeleton/>}
                subheader={<Skeleton/>}
            />
            <Skeleton variant="rectangular" width="100%">
                <CardMedia
                    component="img"
                    height="194"
                    alt="Paella dish"
                />
            </Skeleton>
            <CardContent>
                <Typography variant="body2" color="text.secondary">
                    <Skeleton/>
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <IconButton aria-label="add to favorites">
                    <Skeleton/>
                </IconButton>
                <IconButton aria-label="share">
                    <Skeleton/>
                </IconButton>
            </CardActions>

        </NewsItem>
    );
};

export default NewsItemSkeleton;