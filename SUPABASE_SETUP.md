# Supabase Setup for Newsletter Subscription

This guide explains how to set up Supabase with Resend for the newsletter subscription functionality.

## Prerequisites

1. Supabase account and project
2. Resend account and API key
3. Node.js and Supabase CLI installed

## Step 1: Database Setup

### Run the Migration

```bash
# Navigate to your project directory
cd silverspringsresidences

# Run the migration to create the newsletter_subscribers table
supabase db push
```

This will create the `newsletter_subscribers` table with the following structure:

- `id`: UUID primary key
- `email`: Unique email address
- `subscribed_at`: Timestamp when subscription was created
- `status`: Subscription status ('active' or 'unsubscribed')
- `created_at`: Record creation timestamp
- `updated_at`: Record update timestamp

## Step 2: Edge Function Setup

### Deploy the Edge Function

```bash
# Deploy the add-to-resend-contacts function
supabase functions deploy add-to-resend-contacts
```

## Step 3: Environment Variables

### Set Supabase Environment Variables

You need to set the following environment variables in your Supabase project:

1. Go to your Supabase dashboard
2. Navigate to Settings > Edge Functions
3. Add the following environment variables:

```
RESEND_API_KEY=your_resend_api_key_here
RESEND_AUDIENCE_ID=your_audience_id_here
```

### Get Resend API Key

1. Sign up/login to [Resend](https://resend.com)
2. Go to API Keys in your dashboard
3. Create a new API key
4. Copy the API key and add it to your Supabase environment variables

### Get Resend Audience ID (Optional)

1. In Resend dashboard, go to Contacts
2. Create a new audience or use the default one
3. Copy the audience ID and add it to your Supabase environment variables

## Step 4: Test the Setup

### Test the Newsletter Subscription

1. Start your development server:

```bash
npm run dev
```

2. Navigate to the blog page
3. Try subscribing to the newsletter with a test email
4. Check your Supabase database to see if the email was added
5. Check your Resend dashboard to see if the contact was added

## Troubleshooting

### Common Issues

1. **Edge Function Not Found**: Make sure you've deployed the function using `supabase functions deploy add-to-resend-contacts`

2. **Environment Variables Not Set**: Verify that `RESEND_API_KEY` is set in your Supabase Edge Functions environment variables

3. **Database Permission Errors**: The migration includes Row Level Security policies. Make sure they're properly applied.

4. **Resend API Errors**: Check that your Resend API key is valid and has the necessary permissions.

### Debugging

1. Check Supabase Edge Function logs:

```bash
supabase functions logs add-to-resend-contacts
```

2. Check browser console for any JavaScript errors

3. Verify database connection in your Supabase dashboard

## Security Notes

- The newsletter subscription allows anonymous users to subscribe (no authentication required)
- Email addresses are stored securely in Supabase
- Row Level Security is enabled on the newsletter_subscribers table
- Only authenticated users can read the subscriber list (for admin purposes)

## Production Considerations

1. **Rate Limiting**: Consider implementing rate limiting for the subscription endpoint
2. **Email Validation**: The current implementation includes basic email validation
3. **Unsubscribe Functionality**: Consider adding an unsubscribe mechanism
4. **GDPR Compliance**: Ensure your newsletter subscription complies with GDPR requirements
5. **Backup**: Regularly backup your newsletter subscriber data

## API Endpoints

The newsletter subscription uses the following endpoints:

- **POST** `/functions/v1/add-to-resend-contacts` - Adds email to Resend contact list
- **INSERT** `newsletter_subscribers` table - Stores subscriber data in Supabase

## Support

If you encounter any issues:

1. Check the Supabase documentation
2. Review the Resend API documentation
3. Check the browser console and Supabase logs for error messages
4. Verify all environment variables are correctly set
