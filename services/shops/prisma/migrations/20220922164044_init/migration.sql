-- CreateTable
CREATE TABLE "Shop" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "location_json_str" TEXT NOT NULL,
    "business_dates_json_str" TEXT NOT NULL
);
