import React, {useEffect, useState} from 'react';
import {Box, Button,} from "@mui/material";
import {useNavigate} from "react-router-dom";
import Breadcrumb from "../../components/Breadcrumb";
import {Container} from "../../assets/components/breadcrumb";
import {styled} from '@mui/material/styles';
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
import {ComponentMode, SimpleItemAlignment} from "../../types/global";
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import {NewsService} from "../../services/NewsService";
import {News} from "../../types/news";
import {NewsItem, NewsList} from "../../assets/components/News";
import exp from "constants";
import {API_URL_WITH_PUBLIC_STORAGE} from "../../http";
import AddEditNewsModal from "../../components/modals/AddEditNewsModal/AddEditNewsModal";

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


// TODO: delete
// TODO: image reduce when screen is small
//TODO: why loaded style

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
        if(newAlignment === SimpleItemAlignment.ROW && expanded) {
            setExpanded({...expanded, expand: false});
        }
        setAlignment(newAlignment);
    };

    useEffect(() => {
        const fetchNews = async () => {
            const { data } = await NewsService.getNews();
            setNews(data);
        }
        fetchNews();
    }, []);


    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [mode, setMode] = useState<ComponentMode>('create');
    const [selectedNews, setSelectedNews] = useState<News | null>(null);

    const onNewsCreateHandle = async (newsFromModal: News, mode: ComponentMode) => {
        if(mode === 'create') {
            const { data } = await NewsService.createNews(newsFromModal);
            setNews([data, ...news]);
        }
        else if(mode === 'update') {
            const { data } = await NewsService.updateNews(newsFromModal.id, newsFromModal);
            const newNewsList = news.map(n => n.id === data.id ? data : n);
            setNews(newNewsList);
        }
        console.log(newsFromModal, mode);
    }

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
                    onClick={() => setModalOpen(true)}
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
                                    <Avatar
                                        sx={{ bgcolor: red[500] }}
                                        aria-label="recipe"
                                        src={`${API_URL_WITH_PUBLIC_STORAGE}/${n.employee.user.avatar}`}
                                    >

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
                                image={`${API_URL_WITH_PUBLIC_STORAGE}/${n.img}`}
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
                                        handleExpandClick(n.id, expand);
                                        setAlignment(SimpleItemAlignment.COLUMN);
                                    }}
                                    expand={expanded
                                        && expanded.id === n.id
                                            ? expanded.expand : false
                                    }
                                    aria-expanded={expanded
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
                                            <MenuItem
                                                onClick={() => {
                                                    setSelectedNews(n);
                                                    setModalOpen(true);
                                                    setMode('update');
                                                }}
                                            >
                                                <ListItemIcon>
                                                    <Edit fontSize="small" />
                                                </ListItemIcon>
                                                <ListItemText>Edit</ListItemText>
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
                                    <Typography paragraph>
                                        <div
                                            dangerouslySetInnerHTML={{
                                                __html: n.text
                                            }}>
                                        </div>

                                    </Typography>
                                </CardContent>
                            </Collapse>
                        </NewsItem>
                    )
                }


           </NewsList>

            {
                modalOpen &&
                <AddEditNewsModal
                    open={modalOpen}
                    setOpen={setModalOpen}
                    onClose={() => setModalOpen(false)}
                    onSave={onNewsCreateHandle}
                    mode={mode}
                    selectedNews={selectedNews}
                />
            }


        </Container>
    );
}


export default ProjectsListPage;