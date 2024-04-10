
interface FeedWrapperProps{
    children:React.ReactNode
}

const FeedWrapper = ({
    children,
}:FeedWrapperProps) => {
    return ( 
        <div className="flex-1 pb-10 relative top-0">
            {children}
        </div>
     );
}
 
export default FeedWrapper;