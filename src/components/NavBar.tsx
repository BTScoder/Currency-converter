
function NavBar() {
    return (
        <nav className="">
            <div className="flex items-center p-4  justify-between">

                <img src="/images/logo.svg" alt="" />

                <p className="text-neutral-200 font-mono uppercase text-[10px]">55 currencies <span className="inline-block">.</span> EOD <span>.</span> ECB DATA</p>
            </div>
            <div>
                <p className="px-2 py-3 bg-lime flex items-center gap-3 w-fit">
                    <span className="inline-block h1.5 w-1.5 bg-neutral-900 rounded-full"></span>
                    <span className="uppercase font-mono">Live Markets</span>
                </p>
            </div>
        </nav>
    )
}

export default NavBar