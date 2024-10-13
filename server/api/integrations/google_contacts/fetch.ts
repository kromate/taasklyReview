import { google } from 'googleapis'

interface GoogleContact {
    name: string;
    photo: string;
    phone: string;
    email: string;
}

export default defineEventHandler(async (event) => {
    // Load environment variables
    const clientId = import.meta.env.G_AUTH_CLIENT_ID
    const clientSecret = import.meta.env.G_AUTH_CLIENT_SECRET

    const selectedGoogleContactCookie = parseCookies(event).selected_google_contact

    if (!selectedGoogleContactCookie) {
        throw createError({ statusCode: 401, message: 'No token found, Connect your google calendar' })
    }
    const googleCalendar = JSON.parse(selectedGoogleContactCookie)

    const oAuth2Client = new google.auth.OAuth2(clientId, clientSecret)
    oAuth2Client.setCredentials({
        access_token: googleCalendar.access_token,
        refresh_token: googleCalendar.refresh_token,
        expiry_date: googleCalendar.expiry_date
    })

    const people = google.people({ version: 'v1', auth: oAuth2Client })

    try {
        let contacts: GoogleContact[] = [];
        let nextPageToken: string = '';

        const searchQuery = getQuery(event).search as string || '';

        do {
            let formattedContacts: GoogleContact[] = [];

            if (searchQuery) {
                const response = await people.people.searchContacts({
                    query: searchQuery,
                    pageSize: 30,
                    readMask: 'names,emailAddresses,phoneNumbers,photos',
                });

                const searchResults = response.data.results;
                if (searchResults) {
                    formattedContacts = searchResults.map(person => ({
                        name: person.person?.names?.[0]?.displayName || '',
                        photo: person.person?.photos?.[0]?.url || '',
                        phone: person.person?.phoneNumbers?.[0]?.value || '',
                        email: person.person?.emailAddresses?.[0]?.value || ''
                    }));
                }
            } else {
                const response = await people.people.connections.list({
                    resourceName: 'people/me',
                    pageSize: 2000,
                    pageToken: nextPageToken,
                    personFields: 'names,emailAddresses,phoneNumbers,photos',
                });

                const connections = response.data.connections;
                if (connections) {
                    formattedContacts = connections.map(contact => ({
                        name: contact.names?.[0]?.displayName || '',
                        photo: contact.photos?.[0]?.url || '',
                        phone: contact.phoneNumbers?.[0]?.value || '',
                        email: contact.emailAddresses?.[0]?.value || ''
                    }));
                }

                nextPageToken = response.data.nextPageToken || '';
            }

            contacts = [...contacts, ...formattedContacts];
        } while (nextPageToken);

        return contacts;
    } catch (error: any) {
        console.log(error);
        throw createError({ statusCode: 401, message: error.message })
    }
})
