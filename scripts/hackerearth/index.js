import fetch from 'node-fetch';
import fs from 'fs';
import { getTags, sleep, batchRun } from '../../helpers.js';


const tags = getTags()

for (let tag of tags) {
    let start = 0;
    let tElems = Infinity;
    const limit = 10;
    let questions = [];

    while (tElems > questions.length) {
        let { total_count, problems_data } = await getQuestions(tag, start, limit);
        tElems = Math.min(total_count, tElems)
        if (tElems == 0) {
            break;
        }
        
        questions = [...questions, ...problems_data]
        start += limit;
    }
    console.log(`Got TAG ${tag} -> `, tElems);
    if (tElems == 0) continue;
    let iData = await batchRun(questions.map(q => q.id), 1, getDetailQuestions)
    fs.writeFile(`./res/${tag}.json`, JSON.stringify(iData), 'utf8', (resp) => {
        console.log(resp);
    });
    await sleep(5000);
}

async function getQuestions(tag, start, limit) {
    const response = await fetch("https://app.hackerearth.com/recruiter/library-listing/problems-data/", {
        "headers": {
            "accept": "application/json, text/plain, */*",
            "accept-language": "en-US,en;q=0.9",
            "content-type": "application/json",
            "csrftoken": "XMk9hcwvaOXSTFIzgkZPJUSvjVScfLlUInDsCP8awYb4TMsyGnf97jamFdCHnBSU",
            "sec-ch-ua": "\" Not A;Brand\";v=\"99\", \"Chromium\";v=\"101\", \"Google Chrome\";v=\"101\"",
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": "\"Windows\"",
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-origin",
            "x-csrftoken": "XMk9hcwvaOXSTFIzgkZPJUSvjVScfLlUInDsCP8awYb4TMsyGnf97jamFdCHnBSU",
            "x-requested-with": "XMLHttpRequest",
            "cookie": "AKA_A2=A; _gcl_aw=GCL.1652079543.Cj0KCQjw1N2TBhCOARIsAGVHQc7r_f1abOVM2_Iw9Uv_eA-9g1T4RBgNu3Vdww64HYDxwzpTm1ywRlMaAuioEALw_wcB; _gcl_au=1.1.1913449456.1652079543; _rdt_uuid=1652079543255.19ff13ba-6b5d-4ad2-a2ca-da86c92edfb8; _ga=GA1.2.1908970201.1652079543; _gid=GA1.2.203835359.1652079543; visitorFromUTM=utm_feeditemid=&utm_device=c&utm_term=hackerearth&utm_source=google&utm_medium=paid&utm_campaign=&hsa_cam=15215950032&hsa_grp=129139117666&hsa_mt=e&hsa_src=g&hsa_ad=560288764534&hsa_acc=8660149232&hsa_net=adwords&hsa_kw=hackerearth&hsa_tgt=kwd-155448791077&hsa_ver=3&utm_feeditemid=&utm_device=c&utm_term=hackerearth&utm_source=adword&utm_medium=ppc&utm_campaign=%5BRec%5D+Branded+Keywords&hsa_cam=15215950032&hsa_grp=129139117666&hsa_mt=e&hsa_src=g&hsa_ad=560288764534&hsa_acc=8660149232&hsa_net=adwords&hsa_kw=hackerearth&hsa_tgt=kwd-155448791077&hsa_ver=3&gclid=Cj0KCQjw1N2TBhCOARIsAGVHQc7r_f1abOVM2_Iw9Uv_eA-9g1T4RBgNu3Vdww64HYDxwzpTm1ywRlMaAuioEALw_wcB; _clck=lnrj75|1|f1b|0; __hstc=226601858.3cae813691f9dd5622eda883244e6373.1652079544879.1652079544879.1652079544879.1; hubspotutk=3cae813691f9dd5622eda883244e6373; __hssrc=1; _gac_UA-34729975-1=1.1652079545.Cj0KCQjw1N2TBhCOARIsAGVHQc7r_f1abOVM2_Iw9Uv_eA-9g1T4RBgNu3Vdww64HYDxwzpTm1ywRlMaAuioEALw_wcB; BE_CLA3=p_id%3D62646NJLA8N4RL6N826PJLN88AAAAAAAAH%26bf%3D11d9c79adb2ca786089f376dce7870fb%26bn%3D1%26bv%3D3.44%26s_expire%3D1652165946484%26s_id%3D62646NJLA8N4RP4NRJ8PJLN88AAAAAAAAH; _hp2_id.4007000943=%7B%22userId%22%3A%22220246358197403%22%2C%22pageviewId%22%3A%22121518759347624%22%2C%22sessionId%22%3A%224152558554477802%22%2C%22identity%22%3Anull%2C%22trackerVersion%22%3A%224.0%22%7D; cebs=1; _CEFT=EgNwlgpg7hAmBcALAkmAZgGwIYBUC2ALmAM4DQAygIIDSA6gEoDiOAnImANYBAYsACAHsAEgDFiYAPJCALOQwBzAKwBhADIBaAFZA%3D%3D%3D; _hp2_ses_props.4007000943=%7B%22r%22%3A%22https%3A%2F%2Fwww.hackerearth.com%2F%3Futm_feeditemid%3D%26utm_device%3Dc%26utm_term%3Dhackerearth%26utm_source%3Dgoogle%26utm_medium%3Dpaid%26utm_campaign%3D%26hsa_cam%3D15215950032%26hsa_grp%3D129139117666%26hsa_mt%3De%26hsa_src%3Dg%26hsa_ad%3D560288764534%26hsa_acc%3D8660149232%26hsa_net%3Dadwords%26hsa_kw%3Dhackerearth%26hsa_tgt%3Dkwd-155448791077%26hsa_ver%3D3%26utm_feeditemid%3D%26utm_device%3Dc%26utm_term%3Dhackerearth%26utm_source%3Dadword%26utm_medium%3Dppc%26utm_campaign%3D%255BRec%255D%2BBranded%2BKeywords%26hsa_cam%3D15215950032%26hsa_grp%3D129139117666%26hsa_mt%3De%26hsa_src%3Dg%26hsa_ad%3D560288764534%26hsa_acc%3D8660149232%26hsa_net%3Dadwords%26hsa_kw%3Dhackerearth%26hsa_tgt%3Dkwd-155448791077%26hsa_ver%3D3%26gclid%3DCj0KCQjw1N2TBhCOARIsAGVHQc7r_f1abOVM2_Iw9Uv_eA-9g1T4RBgNu3Vdww64HYDxwzpTm1ywRlMaAuioEALw_wcB%22%2C%22ts%22%3A1652079547035%2C%22d%22%3A%22www.hackerearth.com%22%2C%22h%22%3A%22%2Frecruit%2F%22%7D; messagesUtk=1c388de0503a478cae59af52e2782096; HE_UTS_ID_LP=\"/recruiters/login/\"; ulang=\"ZW4tdXM=\"; HE_UTS_ID_CL=245c62d5212845058daf931d3a9121c5bd27ae06444a4ce2912536efa3a007b6; plang=\"ZW4tdXM=\"; HE_UTS_ID=d7e17306c61e4dbbbe7567470b307874a7c3afffe61b42f4b87703f3e94699a9; _ce.s=v~db888d3c13185636022301f40e45701363da7155~vpv~0~v11.rlc~1652079547731~ir~1~gtrk.la~l2ydiidr; user_tz=Asia/Kolkata; messagesUtk=1c388de0503a478cae59af52e2782096; HE_USER_EXISTS=True; csrftoken=XMk9hcwvaOXSTFIzgkZPJUSvjVScfLlUInDsCP8awYb4TMsyGnf97jamFdCHnBSU; mp_4c30b8635363027dfb780d5a61785112_mixpanel=%7B%22distinct_id%22%3A%20%22180a79d8635aff-00bff1e7eb6c38-17333273-1fa400-180a79d8636c29%22%2C%22%24device_id%22%3A%20%22180a79d8635aff-00bff1e7eb6c38-17333273-1fa400-180a79d8636c29%22%2C%22url_path%22%3A%20%22%2Frecruiters%2Funverified%2F%22%2C%22%24initial_referrer%22%3A%20%22https%3A%2F%2Fwww.hackerearth.com%2F%22%2C%22%24initial_referring_domain%22%3A%20%22www.hackerearth.com%22%2C%22username%22%3A%20%22bonada3027%22%2C%22email%22%3A%20%22bonada3027%403dmasti.com%22%2C%22date_of_joining%22%3A%20%22May%2009%2C%202022%2007%3A01%20AM%22%2C%22user_bucket%22%3A%20%2296%22%2C%22company%22%3A%20%223d%20masti%22%2C%22is_recruiter%22%3A%20%22true%22%7D; _uetsid=82c93430cf6511ec897e21ebecca7e93; _uetvid=ca7f24b06e2911eca29b1922af2fecd1; _clsk=1496dsq|1652079699295|4|1|h.clarity.ms/collect; __hssc=226601858.5.1652079544880; lordoftherings=\"6d4ac7c8c1205e81b22370f4df1ae536:c06d74acb46fe4e2533bc3f53e54ec8c\"; _hjFirstSeen=1; _hjIncludedInPageviewSample=1; _hjSession_975135=eyJpZCI6IjU3NTIxZjQ2LWQzNmYtNGVhMi1hODQxLWE4ZGQ2MWVkNzljMSIsImNyZWF0ZWQiOjE2NTIwNzk3MTYxMDcsImluU2FtcGxlIjp0cnVlfQ==; _hjAbsoluteSessionInProgress=1; _lr_uf_-ye6xwz=47715ceb-1b33-45bf-b3b4-bf0cffe938c4; __stripe_sid=231446d1-0471-4aa1-b785-09a4c68824b2707a77; __stripe_mid=1a64d06a-499d-4bca-8942-fe215f85c4943c32fd; _hjSessionUser_975135=eyJpZCI6ImFmYjQwM2Q5LTJjYzItNTI2Mi1iZTdlLWEyZjhmZDU1N2MwMCIsImNyZWF0ZWQiOjE2NTIwNzk3MTU2NjAsImV4aXN0aW5nIjp0cnVlfQ==; _gat=1; _lr_tabs_-ye6xwz%2Fhe-prod={%22sessionID%22:0%2C%22recordingID%22:%225-f127a0f4-e5c5-45f7-ac6d-39c9493f502a%22%2C%22lastActivity%22:1652081005262}; _lr_hb_-ye6xwz%2Fhe-prod={%22heartbeat%22:1652081005263}; RT=\"sl=11&ss=1652079542014&tt=47034&obo=0&sh=1652081007390%3D11%3A0%3A47034%2C1652079764515%3D10%3A0%3A41074%2C1652079750846%3D9%3A0%3A34733%2C1652079744211%3D8%3A0%3A29445%2C1652079739042%3D7%3A0%3A26191&dm=hackerearth.com&si=8c302912-ae81-408a-b926-48a5121b05fd&se=3600&bcn=%2F%2F684d0d44.akstat.io%2F&rl=1&ld=1652081007390\"; piratesofthecaribbean=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJoZS1zcHJpbnQiLCJ1c2VyX2lkIjo3NjM3Mzg5LCJlbWFpbCI6ImJvbmFkYTMwMjdAM2RtYXN0aS5jb20iLCJleHAiOjE2NTI2ODU4MDd9.VvCyb767Y2iskUW219FtZrbSl85peR2zovpyvJ2Suok",
            "Referer": "https://app.hackerearth.com/recruiter/questions-library/",
            "Referrer-Policy": "strict-origin-when-cross-origin"
        },
        "body": `{\"search_fields\":{\"problem_types\":[\"o\"],\"author_usernames\":[],\"section_ids\":[],\"tags\":[\"${tag}\"],\"difficulties\":[],\"search_text\":\"\"},\"library\":\"hackerearth\",\"sort_by_field\":\"\",\"sort_by_order\":\"\",\"start_index\":${start},\"size\":${limit},\"excluded_problem_types\":[],\"problem_availablity\":\"\"}`,
        "method": "POST"
    });
    return await response.json();
}


async function getDetailQuestions(id) {
    const response = await fetch(`https://app.hackerearth.com/recruiter/api/problems/o/problem/${id}/`, {
        "headers": {
            "accept": "application/json, text/plain, */*",
            "accept-language": "en-US,en;q=0.9",
            "csrftoken": "XMk9hcwvaOXSTFIzgkZPJUSvjVScfLlUInDsCP8awYb4TMsyGnf97jamFdCHnBSU",
            "sec-ch-ua": "\" Not A;Brand\";v=\"99\", \"Chromium\";v=\"101\", \"Google Chrome\";v=\"101\"",
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": "\"Windows\"",
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-origin",
            "x-csrftoken": "XMk9hcwvaOXSTFIzgkZPJUSvjVScfLlUInDsCP8awYb4TMsyGnf97jamFdCHnBSU",
            "x-requested-with": "XMLHttpRequest",
            "cookie": "AKA_A2=A; _gcl_aw=GCL.1652079543.Cj0KCQjw1N2TBhCOARIsAGVHQc7r_f1abOVM2_Iw9Uv_eA-9g1T4RBgNu3Vdww64HYDxwzpTm1ywRlMaAuioEALw_wcB; _gcl_au=1.1.1913449456.1652079543; _rdt_uuid=1652079543255.19ff13ba-6b5d-4ad2-a2ca-da86c92edfb8; _ga=GA1.2.1908970201.1652079543; _gid=GA1.2.203835359.1652079543; visitorFromUTM=utm_feeditemid=&utm_device=c&utm_term=hackerearth&utm_source=google&utm_medium=paid&utm_campaign=&hsa_cam=15215950032&hsa_grp=129139117666&hsa_mt=e&hsa_src=g&hsa_ad=560288764534&hsa_acc=8660149232&hsa_net=adwords&hsa_kw=hackerearth&hsa_tgt=kwd-155448791077&hsa_ver=3&utm_feeditemid=&utm_device=c&utm_term=hackerearth&utm_source=adword&utm_medium=ppc&utm_campaign=%5BRec%5D+Branded+Keywords&hsa_cam=15215950032&hsa_grp=129139117666&hsa_mt=e&hsa_src=g&hsa_ad=560288764534&hsa_acc=8660149232&hsa_net=adwords&hsa_kw=hackerearth&hsa_tgt=kwd-155448791077&hsa_ver=3&gclid=Cj0KCQjw1N2TBhCOARIsAGVHQc7r_f1abOVM2_Iw9Uv_eA-9g1T4RBgNu3Vdww64HYDxwzpTm1ywRlMaAuioEALw_wcB; _clck=lnrj75|1|f1b|0; __hstc=226601858.3cae813691f9dd5622eda883244e6373.1652079544879.1652079544879.1652079544879.1; hubspotutk=3cae813691f9dd5622eda883244e6373; __hssrc=1; _gac_UA-34729975-1=1.1652079545.Cj0KCQjw1N2TBhCOARIsAGVHQc7r_f1abOVM2_Iw9Uv_eA-9g1T4RBgNu3Vdww64HYDxwzpTm1ywRlMaAuioEALw_wcB; BE_CLA3=p_id%3D62646NJLA8N4RL6N826PJLN88AAAAAAAAH%26bf%3D11d9c79adb2ca786089f376dce7870fb%26bn%3D1%26bv%3D3.44%26s_expire%3D1652165946484%26s_id%3D62646NJLA8N4RP4NRJ8PJLN88AAAAAAAAH; _hp2_id.4007000943=%7B%22userId%22%3A%22220246358197403%22%2C%22pageviewId%22%3A%22121518759347624%22%2C%22sessionId%22%3A%224152558554477802%22%2C%22identity%22%3Anull%2C%22trackerVersion%22%3A%224.0%22%7D; cebs=1; _CEFT=EgNwlgpg7hAmBcALAkmAZgGwIYBUC2ALmAM4DQAygIIDSA6gEoDiOAnImANYBAYsACAHsAEgDFiYAPJCALOQwBzAKwBhADIBaAFZA%3D%3D%3D; _hp2_ses_props.4007000943=%7B%22r%22%3A%22https%3A%2F%2Fwww.hackerearth.com%2F%3Futm_feeditemid%3D%26utm_device%3Dc%26utm_term%3Dhackerearth%26utm_source%3Dgoogle%26utm_medium%3Dpaid%26utm_campaign%3D%26hsa_cam%3D15215950032%26hsa_grp%3D129139117666%26hsa_mt%3De%26hsa_src%3Dg%26hsa_ad%3D560288764534%26hsa_acc%3D8660149232%26hsa_net%3Dadwords%26hsa_kw%3Dhackerearth%26hsa_tgt%3Dkwd-155448791077%26hsa_ver%3D3%26utm_feeditemid%3D%26utm_device%3Dc%26utm_term%3Dhackerearth%26utm_source%3Dadword%26utm_medium%3Dppc%26utm_campaign%3D%255BRec%255D%2BBranded%2BKeywords%26hsa_cam%3D15215950032%26hsa_grp%3D129139117666%26hsa_mt%3De%26hsa_src%3Dg%26hsa_ad%3D560288764534%26hsa_acc%3D8660149232%26hsa_net%3Dadwords%26hsa_kw%3Dhackerearth%26hsa_tgt%3Dkwd-155448791077%26hsa_ver%3D3%26gclid%3DCj0KCQjw1N2TBhCOARIsAGVHQc7r_f1abOVM2_Iw9Uv_eA-9g1T4RBgNu3Vdww64HYDxwzpTm1ywRlMaAuioEALw_wcB%22%2C%22ts%22%3A1652079547035%2C%22d%22%3A%22www.hackerearth.com%22%2C%22h%22%3A%22%2Frecruit%2F%22%7D; messagesUtk=1c388de0503a478cae59af52e2782096; HE_UTS_ID_LP=\"/recruiters/login/\"; ulang=\"ZW4tdXM=\"; HE_UTS_ID_CL=245c62d5212845058daf931d3a9121c5bd27ae06444a4ce2912536efa3a007b6; plang=\"ZW4tdXM=\"; HE_UTS_ID=d7e17306c61e4dbbbe7567470b307874a7c3afffe61b42f4b87703f3e94699a9; _ce.s=v~db888d3c13185636022301f40e45701363da7155~vpv~0~v11.rlc~1652079547731~ir~1~gtrk.la~l2ydiidr; user_tz=Asia/Kolkata; messagesUtk=1c388de0503a478cae59af52e2782096; HE_USER_EXISTS=True; csrftoken=XMk9hcwvaOXSTFIzgkZPJUSvjVScfLlUInDsCP8awYb4TMsyGnf97jamFdCHnBSU; mp_4c30b8635363027dfb780d5a61785112_mixpanel=%7B%22distinct_id%22%3A%20%22180a79d8635aff-00bff1e7eb6c38-17333273-1fa400-180a79d8636c29%22%2C%22%24device_id%22%3A%20%22180a79d8635aff-00bff1e7eb6c38-17333273-1fa400-180a79d8636c29%22%2C%22url_path%22%3A%20%22%2Frecruiters%2Funverified%2F%22%2C%22%24initial_referrer%22%3A%20%22https%3A%2F%2Fwww.hackerearth.com%2F%22%2C%22%24initial_referring_domain%22%3A%20%22www.hackerearth.com%22%2C%22username%22%3A%20%22bonada3027%22%2C%22email%22%3A%20%22bonada3027%403dmasti.com%22%2C%22date_of_joining%22%3A%20%22May%2009%2C%202022%2007%3A01%20AM%22%2C%22user_bucket%22%3A%20%2296%22%2C%22company%22%3A%20%223d%20masti%22%2C%22is_recruiter%22%3A%20%22true%22%7D; _uetsid=82c93430cf6511ec897e21ebecca7e93; _uetvid=ca7f24b06e2911eca29b1922af2fecd1; _clsk=1496dsq|1652079699295|4|1|h.clarity.ms/collect; __hssc=226601858.5.1652079544880; lordoftherings=\"6d4ac7c8c1205e81b22370f4df1ae536:c06d74acb46fe4e2533bc3f53e54ec8c\"; _hjFirstSeen=1; _hjIncludedInPageviewSample=1; _hjSession_975135=eyJpZCI6IjU3NTIxZjQ2LWQzNmYtNGVhMi1hODQxLWE4ZGQ2MWVkNzljMSIsImNyZWF0ZWQiOjE2NTIwNzk3MTYxMDcsImluU2FtcGxlIjp0cnVlfQ==; _hjAbsoluteSessionInProgress=1; _lr_uf_-ye6xwz=47715ceb-1b33-45bf-b3b4-bf0cffe938c4; __stripe_sid=231446d1-0471-4aa1-b785-09a4c68824b2707a77; __stripe_mid=1a64d06a-499d-4bca-8942-fe215f85c4943c32fd; _hjSessionUser_975135=eyJpZCI6ImFmYjQwM2Q5LTJjYzItNTI2Mi1iZTdlLWEyZjhmZDU1N2MwMCIsImNyZWF0ZWQiOjE2NTIwNzk3MTU2NjAsImV4aXN0aW5nIjp0cnVlfQ==; RT=\"sl=10&ss=1652079542014&tt=41074&obo=0&sh=1652079764515%3D10%3A0%3A41074%2C1652079750846%3D9%3A0%3A34733%2C1652079744211%3D8%3A0%3A29445%2C1652079739042%3D7%3A0%3A26191%2C1652079717310%3D6%3A0%3A23871&dm=hackerearth.com&si=8c302912-ae81-408a-b926-48a5121b05fd&se=3600&bcn=%2F%2F684d0d44.akstat.io%2F&rl=1&ld=1652079764515\"; _lr_hb_-ye6xwz%2Fhe-prod={%22heartbeat%22:1652080120631}; piratesofthecaribbean=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJoZS1zcHJpbnQiLCJ1c2VyX2lkIjo3NjM3Mzg5LCJlbWFpbCI6ImJvbmFkYTMwMjdAM2RtYXN0aS5jb20iLCJleHAiOjE2NTI2ODUwMjd9.JolSCzm7olRXMxs8FDCIuWEdtdBY8rw573sewAhWemk; _lr_tabs_-ye6xwz%2Fhe-prod={%22sessionID%22:0%2C%22recordingID%22:%225-f127a0f4-e5c5-45f7-ac6d-39c9493f502a%22%2C%22lastActivity%22:1652080229634}",
            "Referer": "https://app.hackerearth.com/recruiter/questions-library/",
            "Referrer-Policy": "strict-origin-when-cross-origin"
        },
        "body": null,
        "method": "GET"
    });
    let resp = await response.json();
    return {
        q: resp.description,
        a: resp.options_translated
    }
}
