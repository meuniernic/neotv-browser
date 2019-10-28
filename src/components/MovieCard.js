import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import { useTranslation } from "react-i18next";
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CardHeader from '@material-ui/core/CardHeader';
import Button from '@material-ui/core/Button';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import {PlayCircleOutline, PauseCircleFilled, ExpandMore, OpenInNew} from '@material-ui/icons';

const useStyles = makeStyles(theme => ({
  card: {
    width: 350
  },
  media: {
    height: 200,
  },
  text: {
    height: 90
  },
  hide: {
    display: 'none',
  },
  actionButton: {
    marginRight: theme.spacing(1),
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
}));

export default function MediaCard(props) {
  const classes = useStyles();
  const { t } = useTranslation();
  const [expanded, setExpanded] = React.useState(false);
  const [preview, setPreview] = React.useState(false);
  const [video, setVideo] = React.useState(null);

  const handleExpand = () => {
    setExpanded(prev => !prev);
  };
  
  const handlePreview = () => {
    setPreview(!preview);
    setVideo(!preview ? props.link : null); 
    if (!preview) {
      console.log(document.getElementsByTagName("video")[0]);
    }
  };


  return (
      <Card className={classes.card}>
      <CardActionArea className={clsx(preview && classes.hided) }>
      <CardHeader title={props.cardTitle} 
        subheader={props.cardDate} 
      />
        <CardMedia 
          className={classes.media}
          image={props.imageUrl}
          title={props.imageTitle}
        >
          <video className={clsx(classes.media, !preview && classes.hide)}  muted autoPlay={preview}>
              <source src={props.link} type="video/mp4" />
          </video>
          </CardMedia>
        <CardContent className={classes.text}>
          <Typography variant="body2" color="textSecondary" component="p">
            {props.cardIntroText}
          </Typography>
        </CardContent>
      </CardActionArea>
      
      <CardActions disableSpacing>
        <Button size="small"  variant="contained" color="primary"  href={props.link} className={classes.actionButton} startIcon={<OpenInNew />} target="_blank">
          {t("media.launch")}
        </Button>
        <Button size="small" variant="contained" color="secondary" 
                 className={classes.actionButton} onClick={handlePreview} startIcon={preview ? <PauseCircleFilled />: <PlayCircleOutline /> } >
            {preview ? t("media.stop") : t("media.preview")}
          </Button>
         
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpand}
          aria-expanded={expanded}
          aria-label={t("media.showMore")}
        >
          <ExpandMore />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph variant="overline">{t("media.summary")}</Typography>
          <Typography paragraph>
            {props.cardText}
          </Typography>
        </CardContent>
      </Collapse>
      
    </Card>
  );
}