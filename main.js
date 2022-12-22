import {
    createAccountDetails, 
    createSocialLinks, 
    createNextButtons
} from './createProfile.js'

createAccountDetails();
createSocialLinks();
createNextButtons();

import { mailchimpSubs } from './mailchimpSubs.js'
import { stripeModal } from './stripeModal.js'

mailchimpSubs();
stripeModal();

fetch("/api/analytics");