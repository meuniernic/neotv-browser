import React from "react";
import PropTypes from 'prop-types';
import { withStyles } from "@material-ui/core/styles";
import { withTranslation } from "react-i18next";
import clsx from "clsx";
import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  CardHeader,
  Button,
  Collapse,
  IconButton,
  Typography
} from "@material-ui/core";
import {
  PlayCircleOutline,
  PauseCircleFilled,
  ExpandMore,
  OpenInNew
} from "@material-ui/icons";
import * as util from "../util.js";


class MediaCard extends React.Component {

  static propTypes = {
    // ...prop type definitions here
    variant: PropTypes.oneOf(['simple', 'full']).isRequired,
    cover: PropTypes.string.isRequired,
    title: PropTypes.string,
    callback: PropTypes.func,
    date: PropTypes.string,
    description: PropTypes.string,
    media: PropTypes.string
  };
  
  static defaultProps = {
    variant: 'simple'
  };

  constructor(props) {
    super(props);
    this.state = {
      expanded: false,
      preview: false
    };

    this.handleExpand = this.handleExpand.bind(this);
    this.handlePreview = this.handlePreview.bind(this);
    this.isSimple = this.isSimple.bind(this);
  }

  isSimple = () => {
    return this.props.variant === 'simple';
  }

  handleExpand = () => {
    this.setState({ expanded: !this.state.expanded });
  };

  handlePreview = () => {
    this.setState({ preview: !this.state.preview});
  };

  render() {
    const { t } = this.props;
    return (
      <Card className={this.props.classes.card}>
        <CardActionArea>
          <CardHeader title={this.props.title} subheader={this.props.date} className={clsx(this.isSimple() && this.props.classes.hide)} />
          <CardMedia
            className={this.props.classes.media}
            image={this.props.cover}
            title={this.props.title}
            onClick={this.props.callback}
          >
            <video
              className={clsx(this.props.classes.media, !this.state.preview && this.props.classes.hide)}
              muted
              autoPlay={this.state.preview}
              width="100%"
            >
              <source src={this.props.media} type="video/mp4" />
            </video>
          </CardMedia>
          <CardContent className={clsx(this.props.classes.text, this.isSimple() && this.props.classes.hide)}>
            <Typography variant="body2" color="textSecondary" component="p">
              {util.wrapText(this.props.description)}
            </Typography>
          </CardContent>
        </CardActionArea>

        <CardActions disableSpacing className={clsx(this.isSimple() && this.props.classes.hide)}>
          <Button
            size="small"
            variant="contained"
            color="primary"
            href={this.props.media}
            className={this.props.classes.actionButton}
            startIcon={<OpenInNew />}
            target="_blank"
          >
            {t("media.launch")}
          </Button>
          <Button
            size="small"
            variant="contained"
            color="secondary"
            className={this.props.classes.actionButton}
            onClick={this.handlePreview}
            startIcon={this.state.preview ? <PauseCircleFilled /> : <PlayCircleOutline />}
          >
            {this.state.preview ? t("media.stop") : t("media.preview")}
          </Button>

          <IconButton
            className={clsx(this.props.classes.expand, {
              [this.props.classes.expandOpen]: this.state.expanded
            })}
            onClick={this.handleExpand}
            aria-expanded={this.state.expanded}
            aria-label={t("media.showMore")}
          >
            <ExpandMore />
          </IconButton>
        </CardActions>
        <Collapse in={this.state.expanded} timeout="auto" unmountOnExit className={clsx(this.isSimple() && this.props.classes.hide)}>
          <CardContent>
            <Typography paragraph variant="overline">
              {t("media.summary")}
            </Typography>
            <Typography paragraph>{this.props.description}</Typography>
          </CardContent>
        </Collapse>
      </Card>
    );
  }
}


export default withStyles(function(theme) {
  return {
    card: {
      width: 300
    },
    media: {
      height: 330
    },
    text: {
      height: 90
    },
    hide: {
      display: "none"
    },
    actionButton: {
      marginRight: theme.spacing(1)
    },
    expand: {
      transform: "rotate(0deg)",
      marginLeft: "auto",
      transition: theme.transitions.create("transform", {
        duration: theme.transitions.duration.shortest
      })
    },
    expandOpen: {
      transform: "rotate(180deg)"
    }
  };
})(withTranslation("translation")(MediaCard));
