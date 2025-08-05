import { LeaveBooking } from "@/types";

export const MockUsers = [
    {
        "id": "012ce23e-71bf-40ff-af1a-0432f758819a",
        "name": "Emma Doe",
        "username": "emmadoe",
        "role": "MANAGER",
        "status": "ACTIVE",
        "password":
            "$2b$10$pfz0U9cIzMdSGYcZpFMX2uJsYgGr91NliMwJuCqOWCMAeY0juMTmu",
        "teamId": "4a1c4980-00b6-44ea-9c90-e6068aabc5f0",
        "team": { "alias": "Team Alpha" },
    },
    {
        "id": "59cd4b1e-8d30-42e0-bd68-4b6b0180c4bb",
        "name": "Daniel Doe",
        "username": "danieldoe",
        "role": "MEMBER",
        "status": "ACTIVE",
        "password":
            "$2b$10$pfz0U9cIzMdSGYcZpFMX2uJsYgGr91NliMwJuCqOWCMAeY0juMTmu",
        "teamId": "4a1c4980-00b6-44ea-9c90-e6068aabc5f0",
        "team": { "alias": "Team Alpha" },
        "managerId": "012ce23e-71bf-40ff-af1a-0432f758819a"
    },
    {
        "id": "e999c258-bed8-496b-ab7f-2581555b521d",
        "name": "John Williams",
        "username": "johnwilliams",
        "role": "MEMBER",
        "status": "ACTIVE",
        "password":
            "$2b$10$pfz0U9cIzMdSGYcZpFMX2uJsYgGr91NliMwJuCqOWCMAeY0juMTmu",
        "teamId": "4a1c4980-00b6-44ea-9c90-e6068aabc5f0",
        "team": { "alias": "Team Alpha" },
        "managerId": "012ce23e-71bf-40ff-af1a-0432f758819a"
    },
    {
        "id": "21518fda-b9d4-4d1e-ac0d-20e2900aac0c",
        "name": "Chris Johnson",
        "username": "chrisjohnson",
        "role": "MEMBER",
        "status": "ACTIVE",
        "password":
            "$2b$10$pfz0U9cIzMdSGYcZpFMX2uJsYgGr91NliMwJuCqOWCMAeY0juMTmu",
        "teamId": "4a1c4980-00b6-44ea-9c90-e6068aabc5f0",
        "team": { "alias": "Team Alpha" },
        "managerId": "012ce23e-71bf-40ff-af1a-0432f758819a"
    },
    {
        "id": "86741f2b-bbe2-4fe5-836f-b2d9ac79f7ca",
        "name": "David Smith",
        "username": "davidsmith",
        "role": "MEMBER",
        "status": "ACTIVE",
        "password":
            "$2b$10$pfz0U9cIzMdSGYcZpFMX2uJsYgGr91NliMwJuCqOWCMAeY0juMTmu",
        "teamId": "4a1c4980-00b6-44ea-9c90-e6068aabc5f0",
        "team": { "alias": "Team Alpha" },
        "managerId": "012ce23e-71bf-40ff-af1a-0432f758819a"
    },
    {
        "id": "16b44d0c-5a5f-40ee-8d90-013daf927a8b",
        "name": "Alex Jones",
        "username": "alexjones",
        "role": "MEMBER",
        "status": "ACTIVE",
        "password":
            "$2b$10$pfz0U9cIzMdSGYcZpFMX2uJsYgGr91NliMwJuCqOWCMAeY0juMTmu",
        "teamId": "4a1c4980-00b6-44ea-9c90-e6068aabc5f0",
        "team": { "alias": "Team Alpha" },
        "managerId": "012ce23e-71bf-40ff-af1a-0432f758819a"
    },
    {
        "id": "cf2b0c4e-5b2e-4215-aeaa-34cef15d763b",
        "name": "Alex Williams",
        "username": "alexwilliams",
        "role": "MEMBER",
        "status": "ACTIVE",
        "password":
            "$2b$10$pfz0U9cIzMdSGYcZpFMX2uJsYgGr91NliMwJuCqOWCMAeY0juMTmu",
        "teamId": "4a1c4980-00b6-44ea-9c90-e6068aabc5f0",
        "team": { "alias": "Team Alpha" },
        "managerId": "012ce23e-71bf-40ff-af1a-0432f758819a"
    },
    {
        "id": "61de4146-bfbd-46e0-a18a-b4259244bbaa",
        "name": "Ava Davis",
        "username": "avadavis",
        "role": "MEMBER",
        "status": "ACTIVE",
        "password":
            "$2b$10$pfz0U9cIzMdSGYcZpFMX2uJsYgGr91NliMwJuCqOWCMAeY0juMTmu",
        "teamId": "4a1c4980-00b6-44ea-9c90-e6068aabc5f0",
        "team": { "alias": "Team Alpha" },
        "managerId": "012ce23e-71bf-40ff-af1a-0432f758819a"
    },
    {
        "id": "e589593b-530f-430c-a4c4-93d0480bbcab",
        "name": "David Johnson",
        "username": "davidjohnson",
        "role": "MEMBER",
        "status": "ACTIVE",
        "password":
            "$2b$10$pfz0U9cIzMdSGYcZpFMX2uJsYgGr91NliMwJuCqOWCMAeY0juMTmu",
        "teamId": "4a1c4980-00b6-44ea-9c90-e6068aabc5f0",
        "team": { "alias": "Team Alpha" },
        "managerId": "012ce23e-71bf-40ff-af1a-0432f758819a"
    },
    {
        "id": "7b3efb36-a025-479c-a8ea-89709422f4f4",
        "name": "Emma Miller",
        "username": "emmamiller",
        "role": "MEMBER",
        "status": "ACTIVE",
        "password":
            "$2b$10$pfz0U9cIzMdSGYcZpFMX2uJsYgGr91NliMwJuCqOWCMAeY0juMTmu",
        "teamId": "4a1c4980-00b6-44ea-9c90-e6068aabc5f0",
        "team": { "alias": "Team Alpha" },
        "managerId": "012ce23e-71bf-40ff-af1a-0432f758819a"
    },
    {
        "id": "cac6d6da-93b5-4ed0-83d6-32e4f0aa33cd",
        "name": "Ava Davis",
        "username": "avadavis",
        "role": "MANAGER",
        "status": "ACTIVE",
        "password":
            "$2b$10$pfz0U9cIzMdSGYcZpFMX2uJsYgGr91NliMwJuCqOWCMAeY0juMTmu",
        "teamId": "46784df1-d397-4bd4-947b-847e98bd86f8",
        "team": { "alias": "Team Beta" }
    },
    {
        "id": "5cd0b2c6-47d4-400d-af63-db7dcafb5acf",
        "name": "Olivia Miller",
        "username": "oliviamiller",
        "role": "MEMBER",
        "status": "ACTIVE",
        "password":
            "$2b$10$pfz0U9cIzMdSGYcZpFMX2uJsYgGr91NliMwJuCqOWCMAeY0juMTmu",
        "teamId": "46784df1-d397-4bd4-947b-847e98bd86f8",
        "team": { "alias": "Team Beta" },
        "managerId": "cac6d6da-93b5-4ed0-83d6-32e4f0aa33cd"
    },
    {
        "id": "1c4acbb5-38b9-43fa-be58-7c7862c1b3c8",
        "name": "David Williams",
        "username": "davidwilliams",
        "role": "MEMBER",
        "status": "ACTIVE",
        "password":
            "$2b$10$pfz0U9cIzMdSGYcZpFMX2uJsYgGr91NliMwJuCqOWCMAeY0juMTmu",
        "teamId": "46784df1-d397-4bd4-947b-847e98bd86f8",
        "team": { "alias": "Team Beta" },
        "managerId": "cac6d6da-93b5-4ed0-83d6-32e4f0aa33cd"
    },
    {
        "id": "3c2e4f60-9ae2-44ff-89e6-c0b09c079aa7",
        "name": "Sophia Smith",
        "username": "sophiasmith",
        "role": "MEMBER",
        "status": "ACTIVE",
        "password":
            "$2b$10$pfz0U9cIzMdSGYcZpFMX2uJsYgGr91NliMwJuCqOWCMAeY0juMTmu",
        "teamId": "46784df1-d397-4bd4-947b-847e98bd86f8",
        "team": { "alias": "Team Beta" },
        "managerId": "cac6d6da-93b5-4ed0-83d6-32e4f0aa33cd"
    },
    {
        "id": "cd74760d-359b-420a-9989-2a62c0957953",
        "name": "Jane Wilson",
        "username": "janewilson",
        "role": "MEMBER",
        "status": "ACTIVE",
        "password":
            "$2b$10$pfz0U9cIzMdSGYcZpFMX2uJsYgGr91NliMwJuCqOWCMAeY0juMTmu",
        "teamId": "46784df1-d397-4bd4-947b-847e98bd86f8",
        "team": { "alias": "Team Beta" },
        "managerId": "cac6d6da-93b5-4ed0-83d6-32e4f0aa33cd"
    },
    {
        "id": "58c8dc4d-cae2-4204-b675-0da0887cc60e",
        "name": "Alex Anderson",
        "username": "alexanderson",
        "role": "MEMBER",
        "status": "ACTIVE",
        "password":
            "$2b$10$pfz0U9cIzMdSGYcZpFMX2uJsYgGr91NliMwJuCqOWCMAeY0juMTmu",
        "teamId": "46784df1-d397-4bd4-947b-847e98bd86f8",
        "team": { "alias": "Team Beta" },
        "managerId": "cac6d6da-93b5-4ed0-83d6-32e4f0aa33cd"
    },
    {
        "id": "05682bb3-844a-4d97-b3c8-1647855426e9",
        "name": "Jane Miller",
        "username": "janemiller",
        "role": "MEMBER",
        "status": "ACTIVE",
        "password":
            "$2b$10$pfz0U9cIzMdSGYcZpFMX2uJsYgGr91NliMwJuCqOWCMAeY0juMTmu",
        "teamId": "46784df1-d397-4bd4-947b-847e98bd86f8",
        "team": { "alias": "Team Beta" },
        "managerId": "cac6d6da-93b5-4ed0-83d6-32e4f0aa33cd"
    },
    {
        "id": "0a6b40d5-7a0d-425b-9dd6-372e3fe3355e",
        "name": "Sophia Anderson",
        "username": "sophiaanderson",
        "role": "MEMBER",
        "status": "ACTIVE",
        "password":
            "$2b$10$pfz0U9cIzMdSGYcZpFMX2uJsYgGr91NliMwJuCqOWCMAeY0juMTmu",
        "teamId": "46784df1-d397-4bd4-947b-847e98bd86f8",
        "team": { "alias": "Team Beta" },
        "managerId": "cac6d6da-93b5-4ed0-83d6-32e4f0aa33cd"
    },
    {
        "id": "1f728e2e-0247-4b88-8ba6-4607d32f73df",
        "name": "Jane Anderson",
        "username": "janeanderson",
        "role": "MEMBER",
        "status": "ACTIVE",
        "password":
            "$2b$10$pfz0U9cIzMdSGYcZpFMX2uJsYgGr91NliMwJuCqOWCMAeY0juMTmu",
        "teamId": "46784df1-d397-4bd4-947b-847e98bd86f8",
        "team": { "alias": "Team Beta" },
        "managerId": "cac6d6da-93b5-4ed0-83d6-32e4f0aa33cd"
    },
    {
        "id": "311ea8ad-9e4c-4cc9-80d2-b5b6e0f5260a",
        "name": "Chris Jones",
        "username": "chrisjones",
        "role": "MEMBER",
        "status": "ACTIVE",
        "password":
            "$2b$10$pfz0U9cIzMdSGYcZpFMX2uJsYgGr91NliMwJuCqOWCMAeY0juMTmu",
        "teamId": "46784df1-d397-4bd4-947b-847e98bd86f8",
        "team": { "alias": "Team Beta" },
        "managerId": "cac6d6da-93b5-4ed0-83d6-32e4f0aa33cd"
    },
    {
        "id": "4faf7e25-879d-4bfa-a20d-a27836250bd6",
        "name": "Daniel Miller",
        "username": "danielmiller",
        "role": "MANAGER",
        "status": "ACTIVE",
        "password":
            "$2b$10$pfz0U9cIzMdSGYcZpFMX2uJsYgGr91NliMwJuCqOWCMAeY0juMTmu",
        "teamId": "6e463ba5-da1d-4013-a259-d331b2479548",
        "team": { "alias": "Team Cross" }
    },
    {
        "id": "d2341e20-e988-40f4-826a-283caa3bcb23",
        "name": "Emma Jones",
        "username": "emmajones",
        "role": "MEMBER",
        "status": "ACTIVE",
        "password":
            "$2b$10$pfz0U9cIzMdSGYcZpFMX2uJsYgGr91NliMwJuCqOWCMAeY0juMTmu",
        "teamId": "6e463ba5-da1d-4013-a259-d331b2479548",
        "team": { "alias": "Team Cross" },
        "managerId": "4faf7e25-879d-4bfa-a20d-a27836250bd6"
    },
    {
        "id": "c7b92a85-9f94-4b09-955e-9dc764651217",
        "name": "Emma Wilson",
        "username": "emmawilson",
        "role": "MEMBER",
        "status": "ACTIVE",
        "password":
            "$2b$10$pfz0U9cIzMdSGYcZpFMX2uJsYgGr91NliMwJuCqOWCMAeY0juMTmu",
        "teamId": "6e463ba5-da1d-4013-a259-d331b2479548",
        "team": { "alias": "Team Cross" },
        "managerId": "4faf7e25-879d-4bfa-a20d-a27836250bd6"
    },
    {
        "id": "b695d152-438c-4f23-803f-14da4c95717d",
        "name": "John Jones",
        "username": "johnjones",
        "role": "MEMBER",
        "status": "ACTIVE",
        "password":
            "$2b$10$pfz0U9cIzMdSGYcZpFMX2uJsYgGr91NliMwJuCqOWCMAeY0juMTmu",
        "teamId": "6e463ba5-da1d-4013-a259-d331b2479548",
        "team": { "alias": "Team Cross" },
        "managerId": "4faf7e25-879d-4bfa-a20d-a27836250bd6"
    },
    {
        "id": "e0b3c358-18e0-4a82-b66b-2a3c19c72e9c",
        "name": "Emma Smith",
        "username": "emmasmith",
        "role": "MEMBER",
        "status": "ACTIVE",
        "password":
            "$2b$10$pfz0U9cIzMdSGYcZpFMX2uJsYgGr91NliMwJuCqOWCMAeY0juMTmu",
        "teamId": "6e463ba5-da1d-4013-a259-d331b2479548",
        "team": { "alias": "Team Cross" },
        "managerId": "4faf7e25-879d-4bfa-a20d-a27836250bd6"
    },
    {
        "id": "5a7b6a5b-5a88-4e6e-83ff-2db2373ede19",
        "name": "David Smith",
        "username": "davidsmith",
        "role": "MEMBER",
        "status": "ACTIVE",
        "password":
            "$2b$10$pfz0U9cIzMdSGYcZpFMX2uJsYgGr91NliMwJuCqOWCMAeY0juMTmu",
        "teamId": "6e463ba5-da1d-4013-a259-d331b2479548",
        "team": { "alias": "Team Cross" },
        "managerId": "4faf7e25-879d-4bfa-a20d-a27836250bd6"
    },
    {
        "id": "cad03e74-32e6-4686-8597-e4bd62989da1",
        "name": "David Brown",
        "username": "davidbrown",
        "role": "MEMBER",
        "status": "ACTIVE",
        "password":
            "$2b$10$pfz0U9cIzMdSGYcZpFMX2uJsYgGr91NliMwJuCqOWCMAeY0juMTmu",
        "teamId": "6e463ba5-da1d-4013-a259-d331b2479548",
        "team": { "alias": "Team Cross" },
        "managerId": "4faf7e25-879d-4bfa-a20d-a27836250bd6"
    },
    {
        "id": "11df537f-8bbf-4446-99ee-e161a619bb0f",
        "name": "John Wilson",
        "username": "johnwilson",
        "role": "MEMBER",
        "status": "ACTIVE",
        "password":
            "$2b$10$pfz0U9cIzMdSGYcZpFMX2uJsYgGr91NliMwJuCqOWCMAeY0juMTmu",
        "teamId": "6e463ba5-da1d-4013-a259-d331b2479548",
        "team": { "alias": "Team Cross" },
        "managerId": "4faf7e25-879d-4bfa-a20d-a27836250bd6"
    },
    {
        "id": "c4139e25-729f-4e08-b4a3-245181ff87fd",
        "name": "Sophia Miller",
        "username": "sophiamiller",
        "role": "MEMBER",
        "status": "ACTIVE",
        "password":
            "$2b$10$pfz0U9cIzMdSGYcZpFMX2uJsYgGr91NliMwJuCqOWCMAeY0juMTmu",
        "teamId": "6e463ba5-da1d-4013-a259-d331b2479548",
        "team": { "alias": "Team Cross" },
        "managerId": "4faf7e25-879d-4bfa-a20d-a27836250bd6"
    },
    {
        "id": "bee9d527-eda0-4001-b2fa-0e6f53062d4c",
        "name": "Sophia Wilson",
        "username": "sophiawilson",
        "role": "MEMBER",
        "status": "ACTIVE",
        "password":
            "$2b$10$pfz0U9cIzMdSGYcZpFMX2uJsYgGr91NliMwJuCqOWCMAeY0juMTmu",
        "teamId": "6e463ba5-da1d-4013-a259-d331b2479548",
        "team": { "alias": "Team Cross" },
        "managerId": "4faf7e25-879d-4bfa-a20d-a27836250bd6"
    },
    {
        "id": "ba9c9e9e-ecdc-4f6a-b6b9-c5fe5ba18790",
        "name": "Daniel Wilson",
        "username": "danielwilson",
        "role": "MANAGER",
        "status": "ACTIVE",
        "password":
            "$2b$10$pfz0U9cIzMdSGYcZpFMX2uJsYgGr91NliMwJuCqOWCMAeY0juMTmu",
        "teamId": "fcbe36c7-57a5-4eb5-a24c-c04a0b596204",
        "team": { "alias": "Team Delta" },
    },
    {
        "id": "536f5406-15c1-4219-8608-31c0d7d0f660",
        "name": "David Brown",
        "username": "davidbrown",
        "role": "MEMBER",
        "status": "ACTIVE",
        "password":
            "$2b$10$pfz0U9cIzMdSGYcZpFMX2uJsYgGr91NliMwJuCqOWCMAeY0juMTmu",
        "teamId": "fcbe36c7-57a5-4eb5-a24c-c04a0b596204",
        "team": {
            "alias": "Team Delta"
        },
        "managerId": "ba9c9e9e-ecdc-4f6a-b6b9-c5fe5ba18790"
    },
    {
        "id": "3d0a9ef5-6abb-4ee2-9b6e-10913ea8d06b",
        "name": "Jane Doe",
        "username": "janedoe",
        "role": "MEMBER",
        "status": "ACTIVE",
        "password":
            "$2b$10$pfz0U9cIzMdSGYcZpFMX2uJsYgGr91NliMwJuCqOWCMAeY0juMTmu",
        "teamId": "fcbe36c7-57a5-4eb5-a24c-c04a0b596204",
        "team": { "alias": "Team Delta" },
        "managerId": "ba9c9e9e-ecdc-4f6a-b6b9-c5fe5ba18790"
    },
    {
        "id": "85de106f-eef1-44e8-a4cf-1e089665e872",
        "name": "Daniel Smith",
        "username": "danielsmith",
        "role": "MEMBER",
        "status": "ACTIVE",
        "password":
            "$2b$10$pfz0U9cIzMdSGYcZpFMX2uJsYgGr91NliMwJuCqOWCMAeY0juMTmu",
        "teamId": "fcbe36c7-57a5-4eb5-a24c-c04a0b596204",
        "team": { "alias": "Team Delta" },
        "managerId": "ba9c9e9e-ecdc-4f6a-b6b9-c5fe5ba18790"
    },
    {
        "id": "99bbed39-12f4-4ac1-8413-e326e129d3c8",
        "name": "Chris Smith",
        "username": "chrissmith",
        "role": "MEMBER",
        "status": "ACTIVE",
        "password":
            "$2b$10$pfz0U9cIzMdSGYcZpFMX2uJsYgGr91NliMwJuCqOWCMAeY0juMTmu",
        "teamId": "fcbe36c7-57a5-4eb5-a24c-c04a0b596204",
        "team": {
            "alias": "Team Delta"
        },
        "managerId": "ba9c9e9e-ecdc-4f6a-b6b9-c5fe5ba18790"
    },
    {
        "id": "7ee986b9-423b-4e8d-9fc6-d74513683792",
        "name": "Olivia Jones",
        "username": "oliviajones",
        "role": "MEMBER",
        "status": "ACTIVE",
        "password":
            "$2b$10$pfz0U9cIzMdSGYcZpFMX2uJsYgGr91NliMwJuCqOWCMAeY0juMTmu",
        "teamId": "fcbe36c7-57a5-4eb5-a24c-c04a0b596204",
        "team": {
            "alias": "Team Delta"
        },
        "managerId": "ba9c9e9e-ecdc-4f6a-b6b9-c5fe5ba18790"
    },
    {
        "id": "50a32487-ca88-49c6-ac80-656825341480",
        "name": "Ava Johnson",
        "username": "avajohnson",
        "role": "MEMBER",
        "status": "ACTIVE",
        "password":
            "$2b$10$pfz0U9cIzMdSGYcZpFMX2uJsYgGr91NliMwJuCqOWCMAeY0juMTmu",
        "teamId": "fcbe36c7-57a5-4eb5-a24c-c04a0b596204",
        "team": {
            "alias": "Team Delta"
        },
        "managerId": "ba9c9e9e-ecdc-4f6a-b6b9-c5fe5ba18790"
    },
    {
        "id": "f696a8c9-a6a4-4f16-bc96-ecd690bfddd1",
        "name": "Alex Smith",
        "username": "alexsmith",
        "role": "MEMBER",
        "status": "ACTIVE",
        "password":
            "$2b$10$pfz0U9cIzMdSGYcZpFMX2uJsYgGr91NliMwJuCqOWCMAeY0juMTmu",
        "teamId": "fcbe36c7-57a5-4eb5-a24c-c04a0b596204",
        "team": {
            "alias": "Team Delta"
        },
        "managerId": "ba9c9e9e-ecdc-4f6a-b6b9-c5fe5ba18790"
    },
    {
        "id": "1c6b6cf3-3d62-47b7-a9f8-d6100264d7af",
        "name": "Ava Smith",
        "username": "avasmith",
        "role": "MEMBER",
        "status": "ACTIVE",
        "password":
            "$2b$10$pfz0U9cIzMdSGYcZpFMX2uJsYgGr91NliMwJuCqOWCMAeY0juMTmu",
        "teamId": "fcbe36c7-57a5-4eb5-a24c-c04a0b596204",
        "team": {
            "alias": "Team Delta"
        },
        "managerId": "ba9c9e9e-ecdc-4f6a-b6b9-c5fe5ba18790"
    },
    {
        "id": "4a4b5e47-d979-4b0d-9d1e-fbbc87f25d49",
        "name": "Ava Smith",
        "username": "avasmith",
        "role": "MEMBER",
        "status": "ACTIVE",
        "password":
            "$2b$10$pfz0U9cIzMdSGYcZpFMX2uJsYgGr91NliMwJuCqOWCMAeY0juMTmu",
        "teamId": "fcbe36c7-57a5-4eb5-a24c-c04a0b596204",
        "team": {
            "alias": "Team Delta"
        },
        "managerId": "ba9c9e9e-ecdc-4f6a-b6b9-c5fe5ba18790"
    },
    {
        "id": "ab437f4f-250d-410c-820c-54b46fc2063d",
        "name": "David Williams",
        "username": "davidwilliams",
        "role": "MANAGER",
        "status": "ACTIVE",
        "password":
            "$2b$10$pfz0U9cIzMdSGYcZpFMX2uJsYgGr91NliMwJuCqOWCMAeY0juMTmu",
        "teamId": "a1cf42c7-b29f-4ad5-96ad-8a012a4db4be",
        "team": {
            "alias": "Team Eagle"
        },
    },
    {
        "id": "55d6d5e1-bd4f-4dbc-aff0-0cb6c98b818e",
        "name": "Olivia Smith",
        "username": "oliviasmith",
        "role": "MEMBER",
        "status": "ACTIVE",
        "password":
            "$2b$10$pfz0U9cIzMdSGYcZpFMX2uJsYgGr91NliMwJuCqOWCMAeY0juMTmu",
        "teamId": "a1cf42c7-b29f-4ad5-96ad-8a012a4db4be",
        "team": {
            "alias": "Team Eagle"
        },
        "managerId": "ab437f4f-250d-410c-820c-54b46fc2063d"
    },
    {
        "id": "6a780421-85ba-4819-9a27-5af7e0aa276d",
        "name": "David Wilson",
        "username": "davidwilson",
        "role": "MEMBER",
        "status": "ACTIVE",
        "password":
            "$2b$10$pfz0U9cIzMdSGYcZpFMX2uJsYgGr91NliMwJuCqOWCMAeY0juMTmu",
        "teamId": "a1cf42c7-b29f-4ad5-96ad-8a012a4db4be",
        "team": {
            "alias": "Team Eagle"
        },
        "managerId": "ab437f4f-250d-410c-820c-54b46fc2063d"
    },
    {
        "id": "77ff847e-b31f-409a-9a23-ea32fbc36bac",
        "name": "Ava Doe",
        "username": "avadoe",
        "role": "MEMBER",
        "status": "ACTIVE",
        "password":
            "$2b$10$pfz0U9cIzMdSGYcZpFMX2uJsYgGr91NliMwJuCqOWCMAeY0juMTmu",
        "teamId": "a1cf42c7-b29f-4ad5-96ad-8a012a4db4be",
        "team": {
            "alias": "Team Eagle"
        },
        "managerId": "ab437f4f-250d-410c-820c-54b46fc2063d"
    },
    {
        "id": "024feae8-aaed-4e14-b04f-5b25db741a6c",
        "name": "David Brown",
        "username": "davidbrown",
        "role": "MEMBER",
        "status": "ACTIVE",
        "password":
            "$2b$10$pfz0U9cIzMdSGYcZpFMX2uJsYgGr91NliMwJuCqOWCMAeY0juMTmu",
        "teamId": "a1cf42c7-b29f-4ad5-96ad-8a012a4db4be",
        "team": {
            "alias": "Team Eagle"
        },
        "managerId": "ab437f4f-250d-410c-820c-54b46fc2063d"
    },
    {
        "id": "d6d1950e-d42e-4829-bb54-66cead27d64c",
        "name": "Chris Anderson",
        "username": "chrisanderson",
        "role": "MEMBER",
        "status": "ACTIVE",
        "password":
            "$2b$10$pfz0U9cIzMdSGYcZpFMX2uJsYgGr91NliMwJuCqOWCMAeY0juMTmu",
        "teamId": "a1cf42c7-b29f-4ad5-96ad-8a012a4db4be",
        "team": {
            "alias": "Team Eagle"
        },
        "managerId": "ab437f4f-250d-410c-820c-54b46fc2063d"
    },
    {
        "id": "127a758b-51b0-4d4e-9f97-5f80db571a59",
        "name": "Jane Williams",
        "username": "janewilliams",
        "role": "MEMBER",
        "status": "ACTIVE",
        "password":
            "$2b$10$pfz0U9cIzMdSGYcZpFMX2uJsYgGr91NliMwJuCqOWCMAeY0juMTmu",
        "teamId": "a1cf42c7-b29f-4ad5-96ad-8a012a4db4be",
        "team": {
            "alias": "Team Eagle"
        },
        "managerId": "ab437f4f-250d-410c-820c-54b46fc2063d"
    },
    {
        "id": "ab967389-0c9f-4fde-abc3-ea505bf4fc87",
        "name": "David Jones",
        "username": "davidjones",
        "role": "MEMBER",
        "status": "ACTIVE",
        "password":
            "$2b$10$pfz0U9cIzMdSGYcZpFMX2uJsYgGr91NliMwJuCqOWCMAeY0juMTmu",
        "teamId": "a1cf42c7-b29f-4ad5-96ad-8a012a4db4be",
        "team": {
            "alias": "Team Eagle"
        },
        "managerId": "ab437f4f-250d-410c-820c-54b46fc2063d"
    },
    {
        "id": "d90ca015-33b5-4de5-82a5-dce45b3bb115",
        "name": "John Anderson",
        "username": "johnanderson",
        "role": "MEMBER",
        "status": "ACTIVE",
        "password":
            "$2b$10$pfz0U9cIzMdSGYcZpFMX2uJsYgGr91NliMwJuCqOWCMAeY0juMTmu",
        "teamId": "a1cf42c7-b29f-4ad5-96ad-8a012a4db4be",
        "team": {
            "alias": "Team Eagle"
        },
        "managerId": "ab437f4f-250d-410c-820c-54b46fc2063d"
    },
    {
        "id": "c99d6c26-e040-4618-afb4-d4dadb2d33b4",
        "name": "Chris Brown",
        "username": "chrisbrown",
        "role": "MEMBER",
        "status": "ACTIVE",
        "password":
            "$2b$10$pfz0U9cIzMdSGYcZpFMX2uJsYgGr91NliMwJuCqOWCMAeY0juMTmu",
        "teamId": "a1cf42c7-b29f-4ad5-96ad-8a012a4db4be",
        "team": {
            "alias": "Team Eagle"
        },
        "managerId": "ab437f4f-250d-410c-820c-54b46fc2063d"
    },
    {
        "id": "1",
        "username": "admin001",
        "name": "Admin User",
        "role": "ADMIN",
        "status": "ACTIVE",
        "password":
            "$2b$10$pfz0U9cIzMdSGYcZpFMX2uJsYgGr91NliMwJuCqOWCMAeY0juMTmu",
        "teamId": "team123",
        "managerId": "manager123",
    }
]

export const MockTeams = [
    {
        "id": "4a1c4980-00b6-44ea-9c90-e6068aabc5f0",
        "alias": "Team Alpha",
        "managerId": "012ce23e-71bf-40ff-af1a-0432f758819a",
        "members": [],
        "bookings": [],
    },
    {
        "id": "46784df1-d397-4bd4-947b-847e98bd86f8",
        "alias": "Team Beta",
        "managerId": "cac6d6da-93b5-4ed0-83d6-32e4f0aa33cd",
        "members": [],
        "bookings": [],
    },
    {
        "id": "6e463ba5-da1d-4013-a259-d331b2479548",
        "alias": "Team Cross",
        "managerId": "4faf7e25-879d-4bfa-a20d-a27836250bd6",
        "members": [],
        "bookings": [],
    },
    {
        "id": "fcbe36c7-57a5-4eb5-a24c-c04a0b596204",
        "alias": "Team Delta",
        "managerId": "ba9c9e9e-ecdc-4f6a-b6b9-c5fe5ba18790",
        "members": [],
        "bookings": [],
    },
    {
        "id": "a1cf42c7-b29f-4ad5-96ad-8a012a4db4be",
        "alias": "Team Eagle",
        "managerId": "ab437f4f-250d-410c-820c-54b46fc2063d",
        "members": [],
        "bookings": [],
    }
]

// Mock leave bookings
export const leaveBookings: LeaveBooking[] = [
    {
        id: "1",
        memberId: "1",
        memberName: "John Doe",
        startDate: new Date("2025-06-10"),
        endDate: new Date("2025-06-14"),
        reason: "Vacation",
        status: "approved",
        createdAt: new Date("2025-01-15"),
    },
    {
        id: "2",
        memberId: "2",
        memberName: "Jane Smith",
        startDate: new Date("2025-06-20"),
        endDate: new Date("2025-06-22"),
        reason: "Personal",
        status: "pending",
        createdAt: new Date("2025-01-20"),
    },
];
