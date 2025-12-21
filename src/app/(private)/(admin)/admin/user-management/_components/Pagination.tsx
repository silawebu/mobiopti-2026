import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from "@/components/ui/pagination";

type Props = {
	count: number;
	page: number;
	itemsPerPage: number;
	search: string | null;
};

export default function Paginator({
	count,
	page,
	itemsPerPage,
	search,
}: Props) {
	const totalPages = Math.ceil(count / itemsPerPage);

	if (totalPages === 1) return null;

	if (count === 0) return null;

	return (
		<div className="flex justify-center items-center w-full">
			<Pagination>
				<PaginationContent>
					{page > 1 && (
						<>
							<PaginationItem>
								<PaginationPrevious
									className="cursor-pointer"
									href={`/admin/user-management?page=${page - 1}${
										search ? `&search=${search}` : ""
									}`}
								/>
							</PaginationItem>

							{page > 2 && (
								<PaginationItem>
									<PaginationEllipsis />
								</PaginationItem>
							)}

							<PaginationItem>
								<PaginationLink
									isActive={false}
									className="cursor-pointer"
									href={`/admin/user-management?page=${page - 1}${
										search ? `&search=${search}` : ""
									}`}
								>
									{page - 1}
								</PaginationLink>
							</PaginationItem>
						</>
					)}

					<PaginationItem>
						<PaginationLink
							isActive={true}
							className="cursor-pointer"
							href={`/admin/user-management?page=${page}${
								search ? `&search=${search}` : ""
							}`}
						>
							{page}
						</PaginationLink>
					</PaginationItem>

					{page < totalPages && (
						<>
							<PaginationItem>
								<PaginationLink
									className="cursor-pointer"
									href={`/admin/user-management?page=${page + 1}${
										search ? `&search=${search}` : ""
									}`}
								>
									{page + 1}
								</PaginationLink>
							</PaginationItem>

							{page < totalPages - 1 && (
								<PaginationItem>
									<PaginationEllipsis />
								</PaginationItem>
							)}

							<PaginationItem>
								<PaginationNext
									className="cursor-pointer"
									href={`/admin/user-management?page=${page + 1}${
										search ? `&search=${search}` : ""
									}`}
								/>
							</PaginationItem>
						</>
					)}
				</PaginationContent>
			</Pagination>
		</div>
	);
}
