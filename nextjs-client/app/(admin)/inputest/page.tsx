"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import { CalendarIcon, Search, FileText, CheckCircle, ListChecks } from "lucide-react";

export default function InputestPage() {
    return (
        <div className="flex flex-col gap-6 animate-in fade-in duration-500 pb-10">

            {/* Action Buttons */}
            <div className="flex justify-between items-center">
                <div className="flex gap-2">
                    <Button className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-6 py-5 rounded-md shadow-sm">
                        신규등록
                    </Button>
                    <Button variant="outline" className="border-slate-300 text-slate-600 font-bold px-6 py-5 rounded-md bg-white hover:bg-slate-50 shadow-sm">
                        변경등록
                    </Button>
                </div>
                <div className="flex gap-2">
                    <Button className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-6 py-5 rounded-md shadow-sm flex gap-2">
                        <Search className="w-4 h-4" />
                        조회
                    </Button>
                    <Button variant="outline" className="border-slate-300 text-slate-600 font-bold px-6 py-5 rounded-md bg-white hover:bg-slate-50 shadow-sm">
                        공제증권발행
                    </Button>
                    <Button variant="outline" className="border-slate-300 text-slate-600 font-bold px-6 py-5 rounded-md bg-white hover:bg-slate-50 shadow-sm flex gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        승인
                    </Button>
                    <Button variant="outline" className="border-slate-300 text-slate-600 font-bold px-6 py-5 rounded-md bg-white hover:bg-slate-50 shadow-sm flex gap-2">
                        <ListChecks className="w-4 h-4 text-blue-500" />
                        일괄승인
                    </Button>
                </div>
            </div>

            {/* Search Form Table */}
            <div className="bg-white border rounded-lg overflow-hidden shadow-sm">
                <div className="grid grid-cols-[180px_1fr] border-b">
                    <div className="bg-slate-50 p-4 font-bold text-slate-600 border-r flex items-center">등록번호</div>
                    <div className="p-3 flex items-center gap-3">
                        <Input className="max-w-[300px] bg-slate-50/50" placeholder="" />
                        <span className="text-slate-400">-</span>
                        <Input className="max-w-[400px] bg-slate-50/50" placeholder="" />
                    </div>
                </div>
                <div className="grid grid-cols-[180px_1fr] border-b">
                    <div className="bg-slate-50 p-4 font-bold text-slate-600 border-r flex items-center">구분</div>
                    <div className="p-3 flex items-center gap-3">
                        <Select defaultValue="building">
                            <SelectTrigger className="max-w-[300px] bg-slate-50/50">
                                <SelectValue placeholder="선택" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="building">건물명</SelectItem>
                                <SelectItem value="facility">시설물명</SelectItem>
                            </SelectContent>
                        </Select>
                        <Input className="max-w-[400px] bg-slate-50/50" placeholder="" />
                    </div>
                </div>
                <div className="grid grid-cols-[180px_1fr]">
                    <div className="bg-slate-50 p-4 font-bold text-slate-600 border-r flex items-center">가입일</div>
                    <div className="p-3 flex items-center gap-3 text-slate-600">
                        <div className="relative max-w-[300px] w-full">
                            <Input className="bg-slate-50/50 pr-10" defaultValue="2022-01-01" />
                            <CalendarIcon className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        </div>
                        <span className="text-slate-400">-</span>
                        <div className="relative max-w-[300px] w-full">
                            <Input className="bg-slate-50/50 pr-10" defaultValue="2022-01-01" />
                            <CalendarIcon className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Summary Statistics */}
            <div className="grid grid-cols-3 gap-6">
                <Card className="border-none shadow-md overflow-hidden group hover:scale-[1.02] transition-transform duration-300">
                    <div className="bg-slate-50 p-5 font-bold text-slate-700 border-b flex justify-between items-center group-hover:bg-blue-50 transition-colors">
                        공개가입 건수
                        <FileText className="w-5 h-5 text-blue-500" />
                    </div>
                    <CardContent className="p-8 text-right bg-white">
                        <span className="text-3xl font-black text-slate-800">123,744</span>
                        <span className="text-slate-500 ml-2 font-bold">건</span>
                    </CardContent>
                </Card>
                <Card className="border-none shadow-md overflow-hidden group hover:scale-[1.02] transition-transform duration-300">
                    <div className="bg-slate-50 p-5 font-bold text-slate-700 border-b flex justify-between items-center group-hover:bg-green-50 transition-colors">
                        건물등록 건수
                        <FileText className="w-5 h-5 text-green-500" />
                    </div>
                    <CardContent className="p-8 text-right bg-white">
                        <span className="text-3xl font-black text-slate-800">111,287</span>
                        <span className="text-slate-500 ml-2 font-bold">건</span>
                    </CardContent>
                </Card>
                <Card className="border-none shadow-md overflow-hidden group hover:scale-[1.02] transition-transform duration-300">
                    <div className="bg-slate-50 p-5 font-bold text-slate-700 border-b flex justify-between items-center group-hover:bg-purple-50 transition-colors">
                        시설물 등록건수
                        <FileText className="w-5 h-5 text-purple-500" />
                    </div>
                    <CardContent className="p-8 text-right bg-white">
                        <span className="text-3xl font-black text-slate-800">359,663</span>
                        <span className="text-slate-500 ml-2 font-bold">건</span>
                    </CardContent>
                </Card>
            </div>

            {/* Placeholder Data Table */}
            <div className="bg-white border rounded-lg shadow-sm">
                <Table>
                    <TableHeader className="bg-slate-50">
                        <TableRow>
                            <TableHead className="w-[100px] font-bold text-slate-600">번호</TableHead>
                            <TableHead className="font-bold text-slate-600">가입번호</TableHead>
                            <TableHead className="font-bold text-slate-600">구분</TableHead>
                            <TableHead className="font-bold text-slate-600">건물명/시설물명</TableHead>
                            <TableHead className="font-bold text-slate-600">가입일</TableHead>
                            <TableHead className="text-right font-bold text-slate-600">상태</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow className="hover:bg-slate-50 transition-colors">
                            <TableCell className="font-medium text-slate-500 italic">1</TableCell>
                            <TableCell className="font-bold text-blue-600 underline cursor-pointer">REG-2022-001</TableCell>
                            <TableCell>건물</TableCell>
                            <TableCell className="font-medium">서울 시청 본관</TableCell>
                            <TableCell className="text-slate-500">2022-01-15</TableCell>
                            <TableCell className="text-right">
                                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold ring-1 ring-green-600/20">
                                    승인완료
                                </span>
                            </TableCell>
                        </TableRow>
                        <TableRow className="hover:bg-slate-50 transition-colors">
                            <TableCell className="font-medium text-slate-500 italic">2</TableCell>
                            <TableCell className="font-bold text-blue-600 underline cursor-pointer">REG-2022-005</TableCell>
                            <TableCell>시설물</TableCell>
                            <TableCell className="font-medium">부산 광안대교</TableCell>
                            <TableCell className="text-slate-500">2022-02-10</TableCell>
                            <TableCell className="text-right">
                                <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-bold ring-1 ring-blue-600/20">
                                    검토중
                                </span>
                            </TableCell>
                        </TableRow>
                        <TableRow className="hover:bg-slate-50 transition-colors">
                            <TableCell className="font-medium text-slate-500 italic">3</TableCell>
                            <TableCell className="font-bold text-blue-600 underline cursor-pointer">REG-2022-012</TableCell>
                            <TableCell>건물</TableCell>
                            <TableCell className="font-medium">대구 엑스코</TableCell>
                            <TableCell className="text-slate-500">2022-03-05</TableCell>
                            <TableCell className="text-right">
                                <span className="bg-slate-100 text-slate-700 px-3 py-1 rounded-full text-xs font-bold ring-1 ring-slate-600/20">
                                    신규등록
                                </span>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
