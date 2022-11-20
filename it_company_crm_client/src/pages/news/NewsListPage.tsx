import React, {useEffect, useMemo, useRef, useState} from 'react';
import {Box, Button, CircularProgress,} from "@mui/material";
import Breadcrumb from "../../components/Breadcrumb";
import {Container} from "../../assets/components/breadcrumb";
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
import {ExpandMore, NewsContent, NewsItem, NewsList, newsPaperStyle} from "../../assets/components/News";
import {API_URL_WITH_PUBLIC_STORAGE} from "../../http";
import {getPageCount, getQueryVarsInStringFormat} from "../../utils/pages";
import {useFetching} from "../../hooks/useFetching";
import {useObserver} from "../../hooks/useObserver";
import {defPage} from "../../utils/constant";
import AddEditNewsModal from '../../components/modals/AddEditNewsModal/AddEditNewsModal';
import NewsItemSkeleton from "./NewsItemSkeleton";
import moment from "moment/moment";
import {ViewService} from "../../services/ViewService";
import 'react-quill/dist/quill.snow.css';
import 'highlight.js/styles/github-dark.css'
import '../../assets/components/News/style.css';

interface ExpandMoreProps extends IconButtonProps {
    expand: boolean;
}

//TODO: image reduce when screen is small
//TODO: why loaded style

const NewsListPage = () => {

    const [news, setNews] = useState<News[]>([]);
    const lastElementRef = useRef<any>(null);

    const [expanded, setExpanded] = useState<{id: number, expand: boolean } | null>(null);
    const [contextMenu, setContextMenu] = useState<{id: number, open: boolean } | null>(null);

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
    }

    const deleteNews = async (newsId: number) => {
        const { data } = await NewsService.deleteNews(newsId);
        const deleteItem = news.findIndex(n => n.id === newsId);
        news.splice(deleteItem, 1);
        setNews([...news]);
    }

    const [page, setPage] = useState<number>(defPage);
    const [totalPage, setTotalPage] = useState<number>(0);
    const [limit, setLimit] = useState<number>(15);
    const [order, setOrder] = useState<string>('desc');

    const handleExpandClick = (targetId: number, expand: boolean) => {
        setExpanded({id: targetId, expand: expand});
    };

    const [alignment, setAlignment] = useState<SimpleItemAlignment>(SimpleItemAlignment.COLUMN);

    useEffect(() => {
        const storedAlignment = localStorage.getItem('newsAlignment');
        if(storedAlignment) {
            // @ts-ignore
            setAlignment(storedAlignment);
        }
    }, []);

    useEffect(() => {
        fetchNews();
    }, [page, limit, order]);

    useEffect(() => {
        localStorage.setItem('newsAlignment', alignment);
    }, [alignment])

    const handleChange = (
        event: React.MouseEvent<HTMLElement>,
        newAlignment: SimpleItemAlignment,
    ) => {
        if(newAlignment === SimpleItemAlignment.ROW && expanded) {
            setExpanded({...expanded, expand: false});
        }
        setAlignment(newAlignment);
    };

    const urlParamsStr = useMemo<string>( () => {
        const params = [
            { key: 'page', value: page },
            { key: 'limit', value: limit },
            { key: 'order', value: order },
        ];
        return getQueryVarsInStringFormat(params);
    }, [order, page, limit]);

    const [fetchNews, isLoading, error ] = useFetching(async () => {
        const { data } = await NewsService.getNews(urlParamsStr, page === 1);
        const total = getPageCount(data.total, limit);

        setTotalPage(total);
        if(page > 1) {
            setNews([...news, ...data.data]);
        }
        else if(page === 1) {
            setNews([...data.data]);
        }
        else {
            setNews([]);
        }
    });

    useObserver(lastElementRef,page < totalPage, isLoading, () => {
        console.log('-' , page, totalPage, '-');
        setPage(page + 1);
    });

    return (
        <Container
            onClick={() => {
                setContextMenu(null);
            }}
        >
            <Box className="breadcrumb">
                <Breadcrumb routeSegments={[ { name: "News" }]} />
            </Box>

            <NewsContent>
                <ToggleButtonGroup
                    color="primary"
                    value={alignment}
                    exclusive
                    onChange={handleChange}
                    aria-label="Platform">
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
                    onClick={() => setModalOpen(true)}>
                    Create News
                </Button>
            </NewsContent>

            <h1>News</h1>

            <NewsList style={{height: isLoading && news.length === 0 ? '1000px' : 'auto'}}>
                {
                    isLoading && news.length === 0 ?
                        Array.from(Array(10).keys()).map(e =>
                            <NewsItemSkeleton alignment={alignment} key={e}/>
                        )
                        :
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
                                            sx={{bgcolor: red[500]}}
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
                                            <MoreVertIcon/>
                                        </IconButton>
                                    }
                                    title={n.employee.user.full_name}
                                    subheader={ moment(n.created_at).format('DD.MM.YYYY') }
                                />
                                <CardMedia
                                    style={{ height: '194px'}}
                                    component="img"
                                    width='800'
                                    height="194"
                                    image={`${API_URL_WITH_PUBLIC_STORAGE}/${n.img}`}
                                    alt="Paella dish"
                                />
                                <CardContent>
                                    <hr/>
                                    <Typography
                                        sx={{pt: 1}}
                                        variant={alignment === 'column' ? "h5" : "h6"}
                                        color="text.primary"
                                    >
                                        {n.title}
                                    </Typography>
                                </CardContent>
                                <CardActions disableSpacing>
                                    <IconButton aria-label="add to favorites">
                                        <FavoriteIcon/>
                                    </IconButton>
                                    <IconButton aria-label="share">
                                        <ShareIcon/>
                                    </IconButton>
                                    <ExpandMore
                                        onClickCapture={() => {
                                            let expand = true;
                                            if (expanded) {
                                                if (n.id === expanded.id) {
                                                    expand = !expanded.expand;
                                                }
                                            }
                                            handleExpandClick(n.id, expand);
                                            setAlignment(SimpleItemAlignment.COLUMN);
                                            ViewService.markAsSeen('news', [n.id]);
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
                                        <ExpandMoreIcon/>
                                    </ExpandMore>
                                    {
                                        contextMenu?.open && contextMenu?.id === n.id &&
                                        <Paper sx={newsPaperStyle}>
                                            <MenuList>
                                                <MenuItem
                                                    onClick={() => {
                                                        setSelectedNews(n);
                                                        setModalOpen(true);
                                                        setMode('update');
                                                    }}
                                                >
                                                    <ListItemIcon>
                                                        <Edit fontSize="small"/>
                                                    </ListItemIcon>
                                                    <ListItemText>Edit</ListItemText>
                                                </MenuItem>
                                                <Divider/>
                                                <MenuItem
                                                    onClick={() => deleteNews(n.id)}
                                                >
                                                    <ListItemIcon>
                                                        <Delete fontSize="small"/>
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
                                            <Box
                                                sx={{ '& a ': {
                                                     color: 'blue'
                                                }}}
                                                className='ql-editor '
                                                dangerouslySetInnerHTML={{
                                                    __html: n.text
                                                }}>
                                            </Box>

                                        </Typography>
                                    </CardContent>
                                </Collapse>
                            </NewsItem>
                        )
                }
                <Box
                    ref={lastElementRef}
                    sx={{
                        width: '100%',
                        background: 'red',
                    }}
                ></Box>
                <Box sx={{
                    width: '100%',
                    height: '30px',
                    display: 'flex',
                    justifyContent: 'center'
                }}>
                    {isLoading && news.length > 0 && <CircularProgress />}
                </Box>

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


export default NewsListPage;