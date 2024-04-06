const {models} = require("../models");
const createError = require('http-errors');
const Sequelize = require("sequelize");

exports.home = async (req, res, next) => {
    res.render('index')
}

exports.author = async (req, res, next) => {
    res.render('author');
  }

exports.index = async (req, res, next) => {
    try {
    const findOptions = {
        include: [
            {model: models.Attachments, as: 'attachment'}]
        };
    const posts = await models.Posts.findAll(findOptions);
    res.render('posts.ejs', {posts});

    } catch (error) {
        next(error);
    }
   };

exports.load = async (req, res, next, postId) => {
    try {
        const findOptions = {
            include: [
                {model: models.Attachments, as: 'attachment'}]
            };
        const post = await models.Posts.findByPk(postId, findOptions);
        if (post) {
            req.load = {...req.load, post};
            next();
        } else {
            throw createError(404,'There is no post with id=' + postId);
        }
    } catch (error) {
        next(error);
    }
};

exports.show = async (req, res, next ) => {
    try {
        const {post} = req.load;
        res.render('posts/show', {post})
    } catch(error) {
        next(error)
    }
}

exports.attachment = async (req, res, next) => {
    const {post} = req.load;
    const attachment = await models.Attachments.findByPk(post.attachmentId);
    if (!attachment) {
        res.redirect("/images/vacio.jpg");
        } else if (attachment.image) {
            res.type(attachment.mime);
            res.send(attachment.image);
        } else if (attachment.url) {
            res.redirect(attachment.url);
        } else {
            res.redirect("/images/vacio.jpg");
        }
   }
   

exports.new = (req, res, next) => {

    const post = {
        title: "",
        body: ""
    };

    res.render('posts/new', {post});
};

exports.create = async (req, res, next) => {
    const {title, body} = req.body;
    let post;
    try {
        post = models.Posts.build({title, body});

        post = await post.save({fields: ["title", "body"]});
        
        try {
                if (!req.file) {
                        console.log('Info: Post sin adjunto.');
                        return;
                    }
                const attachment = await models.Attachments.create({
                    mime: req.file.mimetype,
                    image: req.file.buffer,
                    url: null
                    });

                await post.setAttachment(attachment);
                console.log('Success: Attachment saved successfully.');

                } catch (error) {
                    console.log('Error:' + error.message);
                } finally {
                    res.redirect('/posts/' + post.id);
                }
    } catch (error) {
        if (error instanceof (Sequelize.ValidationError)) {
            console.log('There are errors in the form:');
            error.errors.forEach(({message}) => console.log(message));
            res.render('posts/new', {post});
    } else {
        next(error);
    }
    
       
    }
   };

exports.edit = (req, res, next) => {

    const {post} = req.load;

    res.render('posts/edit', {post});
};

exports.update = async (req, res, next) => {
    const {post} = req.load;
    post.title = req.body.title;
    post.body = req.body.body;
    try {
        await post.save({fields: ["title", "body"]});
        res.redirect('/posts/' + post.id);
        if (!post.attachment) {
            console.log('Info: Post attachment not changed.');
            return;
        
        } else {
            console.log('Hay attachment')
            await post.attachment?.destroy();
        }

        const attachment = await models.Attachments.create({
            mime: req.file.mimetype,
            image: req.file.buffer,
            url: null
            });

        await post.setAttachment(attachment);
        console.log('Success: Attachment saved successfully.');
           
    } catch (error) {
        if (error instanceof (Sequelize.ValidationError)) {
            console.log('There are errors in the form:');
            error.errors.forEach(({message}) => console.log(message));
            res.render('posts/edit', {post});
    } else {
        next(error);
    }
    }
   };

exports.destroy = async (req, res, next) => {
    try {
        await req.load.post.destroy();
        res.redirect('/posts');
    } catch (error) {
        next(error);
    }
   };