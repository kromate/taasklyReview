import { google } from 'googleapis'

interface GoogleContact {
    name: string;
    photo: string;
    phone: string;
    email: string;
}

export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    const { name, phone, email, person_id, access_token, refresh_token, expiry_date } = body

    const oAuth2Client = new google.auth.OAuth2(
        import.meta.env.G_AUTH_CLIENT_ID,
        import.meta.env.G_AUTH_CLIENT_SECRET
    )
    oAuth2Client.setCredentials({
        access_token: access_token,
        refresh_token: refresh_token,
        expiry_date: expiry_date
    })

    const people = google.people({ version: 'v1', auth: oAuth2Client })

    try {
        const response = await people.people.createContact({
            requestBody: {
                names: [{ givenName: name }],
                phoneNumbers: phone ? [{ value: phone }] : [],
                emailAddresses: email ? [{ value: email }] : [],
                userDefined: [
                    {
                        key: 'person_id',
                        value: person_id
                    }
                ]
            },
            personFields: 'names,phoneNumbers,emailAddresses,userDefined'
        })

        return {
            success: true,
            data: response.data
        }
    } catch (error: any) {
        console.log(error)
        throw createError({ statusCode: 500, message: error.message })
    }
})