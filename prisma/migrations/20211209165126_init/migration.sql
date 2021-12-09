-- CreateTable
CREATE TABLE "Student" (
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "profile" TEXT NOT NULL,
    "id" SERIAL NOT NULL,
    "age" INTEGER NOT NULL,

    CONSTRAINT "Student_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Picture" (
    "url" TEXT NOT NULL,
    "id" SERIAL NOT NULL,
    "student_id" INTEGER NOT NULL,

    CONSTRAINT "Picture_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Measurement" (
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "id" SERIAL NOT NULL,
    "weight" DOUBLE PRECISION NOT NULL,
    "biceps_left" DOUBLE PRECISION NOT NULL,
    "biceps_right" DOUBLE PRECISION NOT NULL,
    "student_id" INTEGER NOT NULL,

    CONSTRAINT "Measurement_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Student_email_key" ON "Student"("email");

-- AddForeignKey
ALTER TABLE "Picture" ADD CONSTRAINT "Picture_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Measurement" ADD CONSTRAINT "Measurement_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
