import { forwardRef } from "react"
import { motion, type HTMLMotionProps } from "framer-motion"

import { cn } from "@/lib/utils"

interface LinkCardProps extends Omit<HTMLMotionProps<"a">, "href"> {
  title: string
  description: string
  imageUrl: string
  href: string
}

const LinkCard = forwardRef<HTMLAnchorElement, LinkCardProps>(
  ({ className, title, description, imageUrl, href, ...props }, ref) => (
    <motion.a
      ref={ref}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "group relative flex h-80 w-full max-w-sm flex-col justify-between overflow-hidden rounded-2xl border border-primary/35 bg-card p-6 text-card-foreground",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
        className,
      )}
      initial={{ scale: 1, y: 0 }}
      whileHover={{ scale: 1.03, y: -5 }}
      transition={{ type: "spring", stiffness: 300, damping: 15 }}
      aria-label={`Link to ${title}`}
      {...props}
    >
      <div className="z-10 max-w-[80%]">
        <h3 className="mb-2 text-3xl font-semibold tracking-tight text-card-foreground">
          {title}
        </h3>
        <p className="text-sm leading-6 text-muted-foreground">{description}</p>
      </div>

      <div className="absolute -bottom-12 -right-12 size-52 transition-transform duration-300 ease-out group-hover:scale-110">
        <img
          src={imageUrl}
          alt={`${title} illustration`}
          className="size-full object-cover opacity-90"
        />
      </div>
    </motion.a>
  ),
)

LinkCard.displayName = "LinkCard"

export { LinkCard }
