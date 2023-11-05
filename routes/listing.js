const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const { isLoogedIn, isOwner, validateListing } = require("../middleware.js");

const listingController = require("../controllers/listings.js");

router
    .route("/")
    .get(wrapAsync(listingController.index))
    .post(
        isLoogedIn,
        validateListing,
        wrapAsync(listingController.createListing)
    )

router
    .route("/new")
    .get(isLoogedIn, listingController.renderNewForm);
//above show route because it will confuse by show route listings/:id

router
    .route("/:id")
    .get(wrapAsync(listingController.showListing))
    .put(
        isLoogedIn,
        isOwner,
        validateListing,
        wrapAsync(listingController.updateListing)
    )
    .delete(
        isLoogedIn,
        isOwner,
        wrapAsync(listingController.destroyListing)
    )

router
    .route("/:id/edit")
    .get(
        isLoogedIn,
        isOwner,
        wrapAsync(listingController.renderEditForm)
    );


module.exports = router;
