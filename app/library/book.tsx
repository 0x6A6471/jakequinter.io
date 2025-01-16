import { useRef, useState } from "react";
import Image from "next/image";
import * as Dialog from "@radix-ui/react-dialog";
import { motion, AnimatePresence } from "framer-motion";

import { type Book } from "@/types/book";
import cn from "@/utils/classNames";
import Icon from "@/components/ui/icon";

type Props = {
	book: Book;
};

const overlayVariants = {
	initial: { opacity: 0 },
	animate: { opacity: 1 },
	exit: { opacity: 0 },
	transition: { duration: 0.2 },
};

export default function BookItem({ book }: Props) {
	const [isOpen, setIsOpen] = useState(false);
	const itemRef = useRef<HTMLButtonElement | null>(null);

	const getItemPosition = () => {
		if (!itemRef.current) return { top: 0, left: 0 };
		const rect = itemRef.current.getBoundingClientRect();
		const scaleY = rect.height / window.innerHeight;
		return {
			top: rect.top + rect.height / 2,
			left: rect.left + rect.width / 2,
			scaleY,
		};
	};

	return (
		<Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
			<Dialog.Trigger asChild ref={itemRef}>
				<button
					className={cn(
						isOpen ? "invisible" : "",
						"w-full p-4 bg-gray-950 rounded-lg text-left focus:outline-none flex flex-col group relative",
					)}
				>
					<Icon
						name="arrows-expand"
						className="absolute right-2.5 top-2.5 rounded-md text-gray-600 focus:outline-none invisible group-hover:visible"
					/>
					<span className="truncate text-gray-50">{book.title}</span>
					<span className="text-gray-500 text-sm mt-2">{book.creator}</span>
				</button>
			</Dialog.Trigger>

			<AnimatePresence>
				{isOpen && (
					<Dialog.Portal forceMount>
						<motion.div
							variants={overlayVariants}
							initial="initial"
							animate="animate"
							exit="exit"
							className="fixed inset-0 bg-black bg-opacity-80 backdrop-blur-sm"
						/>

						<Dialog.Content
							className="fixed inset-0 flex items-center justify-center"
							forceMount
						>
							<motion.div
								initial={{
									position: "fixed",
									top: getItemPosition().top,
									left: getItemPosition().left,
									x: "-50%",
									y: "-50%",
									scale: 0,
									opacity: 0,
								}}
								animate={{
									top: "50%",
									left: "50%",
									scale: 1,
									opacity: 1,
								}}
								exit={{
									top: getItemPosition().top,
									left: getItemPosition().left,
									scale: 0.2,
									opacity: 0,
								}}
								transition={{
									type: "spring",
									damping: 25,
									stiffness: 300,
								}}
								className="w-[90vw] max-w-lg h-fit max-h-[80vh] rounded-lg bg-gray-1000 overflow-hidden z-20 p-8"
							>
								<Image
									className="mx-auto rounded"
									src={book.cover}
									alt="0x6A6471"
									width={100}
									height={100}
								/>
								<Dialog.Title className="mt-8 text-lg font-medium text-gray-50 text-center">
									{book.title}
								</Dialog.Title>
								<Dialog.Description className="mt-4 text-gray-400">
									{book.description}
								</Dialog.Description>
								<Dialog.Close asChild>
									<button
										className="absolute right-2.5 top-2.5 p-1 rounded-md text-gray-600 focus:outline-none hover:bg-black"
										aria-label="Close"
									>
										<Icon name="x" />
									</button>
								</Dialog.Close>
							</motion.div>
						</Dialog.Content>
					</Dialog.Portal>
				)}
			</AnimatePresence>
		</Dialog.Root>
	);
}
