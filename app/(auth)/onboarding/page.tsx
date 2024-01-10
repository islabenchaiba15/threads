import AccountProfile from "@/components/forms/AccountProfile";
import { currentUser } from "@clerk/nextjs";
async function Page(){
    const user =await currentUser();
    const userInfo ={}
    const userData={
        id: user?.id,
        objectId:userInfo?._id,
        username:user?.username ||userInfo?.username,
        name:user?.firstName ||userInfo?.name || "",
        bio:userInfo?.bio || "",
        image:userInfo?.image || user?.imageUrl,
    }
    return (
        <main className="bg-dark-2 w-full mx-auto flex flex-col
        justify-start px-10 py-20  max-w-3xl">
            <h1 className="head-text">
                onboarding
            </h1>
            <p className="mt-3 text-base-regular text-light-2">
                complete your profile now to use threads
            </p>
            <section className="mt-9 bg-dark-4 p-10">
                <AccountProfile user={userData} btnTitle="Continue"/>
            </section>
        </main>
    )
}
export default Page;