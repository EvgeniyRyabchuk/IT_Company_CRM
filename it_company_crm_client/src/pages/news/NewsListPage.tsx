import React, {useEffect, useState} from 'react';
import {Box, Button,} from "@mui/material";
import {useNavigate} from "react-router-dom";
import Breadcrumb from "../../components/Breadcrumb";
import {Container} from "../../assets/components/breadcrumb";
import {styled} from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton, {IconButtonProps} from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import {red} from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import {Delete, Edit, GridOn, ViewHeadline} from "@mui/icons-material";
import {SimpleItemAlignment} from "../../types/global";
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import {NewsService} from "../../services/NewsService";
import {News} from "../../types/news";
import theme from "echarts/types/src/theme/dark";
import {NewsItem, NewsList} from "../../assets/components/News";

interface ExpandMoreProps extends IconButtonProps {
    expand: boolean;
}


const ExpandMore = styled((props: ExpandMoreProps) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));




const ProjectsListPage = () => {

    const [news, setNews] = useState<News[]>([]);

    const navigator = useNavigate();
    const [expanded, setExpanded] = useState<{id: number, expand: boolean } | null>(null);
    const [contextMenu, setContextMenu] = useState<{id: number, open: boolean } | null>(null);

    const handleExpandClick = (targetId: number, expand: boolean) => {
        setExpanded({id: targetId, expand: expand});
    };


    const [alignment, setAlignment] = useState<SimpleItemAlignment>(SimpleItemAlignment.COLUMN);

    const handleChange = (
        event: React.MouseEvent<HTMLElement>,
        newAlignment: SimpleItemAlignment,
    ) => {
        setAlignment(newAlignment);
    };

    useEffect(() => {
        const fetchNews = async () => {
            const { data } = await NewsService.getNews();
            setNews(data);
        }
        fetchNews();
    }, []);


    // @ts-ignore
    // @ts-ignore
    return (
        <Container
            onClick={() => {
                setContextMenu(null);
            }}
        >

            <Box className="breadcrumb">
                <Breadcrumb routeSegments={[ { name: "News" }]} />
            </Box>

            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    paddingRight: '30px'
                }}>
                <ToggleButtonGroup
                    color="primary"
                    value={alignment}
                    exclusive
                    onChange={handleChange}
                    aria-label="Platform"
                >
                    <ToggleButton value="column">
                        <ViewHeadline/>
                    </ToggleButton>
                    <ToggleButton value="row">
                        <GridOn />
                    </ToggleButton>
                </ToggleButtonGroup>

                <Button
                    style={{ height: '40px'}}
                    variant='contained'
                    onClick={() => {}}
                >
                    Create News
                </Button>
            </Box>

            <h1>News</h1>

            {/*
            // @ts-ignore */}
           <NewsList alignment={alignment}>
                {
                    news.map((n: News) =>
                        <NewsItem
                            sx={{
                                py: 3,
                                px: 1,
                            }}
                            key={n.id}
                            /*
                            // @ts-ignore */
                            alignment={alignment}
                        >
                            <CardHeader
                                avatar={
                                    <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                                        R
                                    </Avatar>
                                }
                                action={
                                    <IconButton
                                        onClick={(e: any) => {
                                            e.stopPropagation();
                                            setContextMenu({id: n.id, open: true})
                                        }}
                                        aria-label="settings">
                                        <MoreVertIcon />
                                    </IconButton>
                                }
                                title="Shrimp and Chorizo Paella"
                                subheader="September 14, 2016"
                            />
                            <CardMedia
                                component="img"
                                height="194"
                                image="https://mui.com/static/images/cards/paella.jpg"
                                alt="Paella dish"
                            />
                            <CardContent>
                                <Typography variant="body2" color="text.secondary">
                                    {n.title}
                                </Typography>
                            </CardContent>
                            <CardActions disableSpacing>
                                <IconButton aria-label="add to favorites">
                                    <FavoriteIcon />
                                </IconButton>
                                <IconButton aria-label="share">
                                    <ShareIcon />
                                </IconButton>
                                <ExpandMore
                                    onClickCapture={() => {
                                        let expand = true;
                                        if(expanded) {
                                            if(n.id === expanded.id) {
                                                expand = !expanded.expand;
                                            }
                                        }
                                        console.log(n.id, expand)
                                        handleExpandClick(n.id, expand);
                                    }}
                                    expand={
                                        expanded
                                        && expanded.id === n.id
                                            ? expanded.expand : false
                                    }
                                    aria-expanded={
                                        expanded
                                        && expanded.id === n.id
                                            ? expanded.expand : false
                                    }
                                    aria-label="show more"
                                >
                                    <ExpandMoreIcon />
                                </ExpandMore>
                                {
                                    contextMenu?.open && contextMenu?.id === n.id &&
                                    <Paper sx={{
                                        width: 200,
                                        maxWidth: '100%',
                                        position: 'absolute',
                                        top: 90,
                                        right: 0
                                    }}>
                                        <MenuList>
                                            <MenuItem>
                                                <ListItemIcon>
                                                    <Edit fontSize="small" />
                                                </ListItemIcon>
                                                <ListItemText>Edit</ListItemText>
                                                {/*<Typography variant="body2" color="text.secondary">*/}
                                                {/*</Typography>*/}
                                            </MenuItem>
                                            <Divider />
                                            <MenuItem>
                                                <ListItemIcon>
                                                    <Delete fontSize="small" />
                                                </ListItemIcon>
                                                <ListItemText>Delete</ListItemText>
                                            </MenuItem>
                                        </MenuList>
                                    </Paper>
                                }
                            </CardActions>
                            <Collapse in={expanded
                            && expanded.id === n.id
                                ? expanded.expand : false} timeout="auto" unmountOnExit>
                                <CardContent>
                                    <Typography paragraph>Method:</Typography>
                                    <Typography paragraph>
                                        Heat 1/2 cup of the broth in a pot until simmering, add saffron and set
                                        aside for 10 minutes.
                                    </Typography>
                                    <Typography paragraph>
                                        {n.text}
                                    </Typography>
                                    <Typography paragraph>
                                        Add rice and stir very gently to distribute. Top with artichokes and
                                        peppers, and cook without stirring, until most of the liquid is absorbed,
                                        15 to 18 minutes. Reduce heat to medium-low, add reserved shrimp and
                                        mussels, tucking them down into the rice, and cook again without
                                        stirring, until mussels have opened and rice is just tender, 5 to 7
                                        minutes more. (Discard any mussels that don&apos;t open.)
                                    </Typography>
                                    <Typography>
                                        Set aside off of the heat to let rest for 10 minutes, and then serve.
                                    </Typography>
                                </CardContent>
                            </Collapse>
                        </NewsItem>


                    )
                }


           </NewsList>



        </Container>
    );
}


export default ProjectsListPage;