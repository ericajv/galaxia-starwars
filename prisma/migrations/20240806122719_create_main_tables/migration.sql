-- CreateTable
CREATE TABLE "planets" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "climate" TEXT NOT NULL,
    "ground" DOUBLE PRECISION NOT NULL,
    "population" INTEGER NOT NULL,
    "star_system" TEXT NOT NULL,

    CONSTRAINT "planets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "star_systems" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "star_systems_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "characters" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "race" TEXT NOT NULL,
    "affiliation" TEXT NOT NULL,
    "planetId" TEXT NOT NULL,

    CONSTRAINT "characters_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "spaceships" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "manufacturer" TEXT NOT NULL,
    "capacity" INTEGER NOT NULL,

    CONSTRAINT "spaceships_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "planets" ADD CONSTRAINT "planets_star_system_fkey" FOREIGN KEY ("star_system") REFERENCES "star_systems"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "characters" ADD CONSTRAINT "characters_planetId_fkey" FOREIGN KEY ("planetId") REFERENCES "planets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
