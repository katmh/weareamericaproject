import React from "react";

const Subscribe = () => {
  const form = {
    __html: `
    <div id="mc_embed_signup">
      <form action="https://weareamericaproject.us4.list-manage.com/subscribe/post?u=466aceffe785790da648587fc&amp;id=3a60133af9&amp;f_id=00d6dae9f0" method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" class="validate" target="_blank" novalidate>
        <div class="mc-field-group">
          <label for="mce-EMAIL" class="caption1">Email address:</label>
          <input type="email" value="" name="EMAIL" class="required email" id="mce-EMAIL">
          <p><span id="mce-EMAIL-HELPERTEXT" class="helper_text"></span></p>
        </div>
        <div id="mce-responses" class="clear foot">
          <p><div class="response" id="mce-error-response" style="display:none"></div></p>
          <p><div class="response" id="mce-success-response" style="display:none"></div></p>
        </div>    <!-- real people should not fill this in and expect good things - do not remove this or risk form bot signups-->
        <div style="position: absolute; left: -5000px;" aria-hidden="true"><input type="text" name="b_466aceffe785790da648587fc_3a60133af9" tabindex="-1" value=""></div>
        <div class="mailchimp_button_container">
          <input type="submit" value="Subscribe" name="subscribe" id="mc-embedded-subscribe" class="button">
        </div>
      </form>
    </div>
    <script type='text/javascript' src='//s3.amazonaws.com/downloads.mailchimp.com/js/mc-validate.js'></script><script type='text/javascript'>(function($) {window.fnames = new Array(); window.ftypes = new Array();fnames[0]='EMAIL';ftypes[0]='email';fnames[1]='FNAME';ftypes[1]='text';fnames[2]='LNAME';ftypes[2]='text';fnames[3]='ADDRESS';ftypes[3]='address';fnames[4]='PHONE';ftypes[4]='phone';fnames[5]='BIRTHDAY';ftypes[5]='birthday';fnames[6]='MMERGE6';ftypes[6]='text';}(jQuery));var $mcj = jQuery.noConflict(true);</script>
    `
  };

  return <div dangerouslySetInnerHTML={form} />;
};

export default Subscribe;
