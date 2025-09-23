import { useId, useState } from "react";
import { Link } from "react-router-dom";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const integrations = [
  { provider: "Figma", status: "Connected", plan: "Pro" },
  { provider: "Slack", status: "Pending", plan: "Free" },
  { provider: "Notion", status: "Connected", plan: "Team" },
];

function UITestHero() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>shadcn/ui Showcase</CardTitle>
        <CardDescription>
          프로젝트에 추가된 컴포넌트 묶음을 빠르게 확인하고 조합해볼 수 있는
          페이지입니다.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex flex-wrap items-center gap-4">
          <Button>기본 버튼</Button>
          <Button variant="secondary">세컨더리</Button>
          <Button variant="outline">아웃라인</Button>
          <Button variant="ghost">고스트</Button>
          <Badge variant="secondary">Badge</Badge>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button size="icon" aria-label="정보">
                  i
                </Button>
              </TooltipTrigger>
              <TooltipContent>툴팁도 함께 확인할 수 있습니다.</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <Alert>
          <AlertTitle>디자인 시스템 정리</AlertTitle>
          <AlertDescription>
            샘플은 최소 구성을 보여주며, 실제 화면에서는 필요한 속성을 추가로
            조정하세요.
          </AlertDescription>
        </Alert>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Avatar className="h-10 w-10">
          <AvatarImage src="https://avatar.vercel.sh/shadcn" alt="Avatar" />
          <AvatarFallback>SC</AvatarFallback>
        </Avatar>
        <Button asChild variant="link">
          <Link to="/">홈으로 이동</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}

function UITestForms() {
  const emailId = useId();
  const teamId = useId();
  const [notifications, setNotifications] = useState(true);
  return (
    <Card>
      <CardHeader>
        <CardTitle>Form Elements</CardTitle>
        <CardDescription>입력, 전환, 팝오버 등 상호작용 샘플</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="grid gap-2">
            <Label htmlFor={emailId}>이메일</Label>
            <Input id={emailId} type="email" placeholder="name@example.com" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor={teamId}>팀 이름</Label>
            <Input id={teamId} placeholder="Design ops" />
          </div>
        </div>
        <Separator />
        <div className="flex items-center justify-between rounded-lg border p-4">
          <div>
            <p className="font-medium text-sm">알림 수신</p>
            <p className="text-muted-foreground text-xs">
              스위치를 사용해 실시간 설정 값을 확인하세요.
            </p>
          </div>
          <Switch
            checked={notifications}
            onCheckedChange={setNotifications}
            aria-label="알림 수신 토글"
          />
        </div>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline">팝오버 열기</Button>
          </PopoverTrigger>
          <PopoverContent className="w-64" side="bottom" align="start">
            <div className="space-y-2">
              <p className="font-medium text-sm">빠른 참고</p>
              <p className="text-muted-foreground text-xs">
                팝오버는 안내 메시지나 보조 입력을 추가할 때 활용합니다.
              </p>
            </div>
          </PopoverContent>
        </Popover>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive">위험 액션</Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>정말로 진행하시겠어요?</AlertDialogTitle>
              <AlertDialogDescription>
                이 동작은 되돌릴 수 없습니다. 샘플 모달을 통해 AlertDialog
                동작을 확인할 수 있습니다.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>취소</AlertDialogCancel>
              <AlertDialogAction>확인</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardContent>
    </Card>
  );
}

function UITestData() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Data & Navigation</CardTitle>
        <CardDescription>
          탭, 아코디언, 테이블 등 정보 표시 컴포넌트
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-8">
        <Tabs defaultValue="summary" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="summary">요약</TabsTrigger>
            <TabsTrigger value="history">히스토리</TabsTrigger>
            <TabsTrigger value="settings">설정</TabsTrigger>
          </TabsList>
          <TabsContent value="summary" className="mt-4 space-y-2">
            <p className="text-muted-foreground text-sm">
              탭을 활용해 화면을 나누고 동일한 영역에서 컨텐츠를 전환할 수
              있습니다.
            </p>
          </TabsContent>
          <TabsContent value="history" className="mt-4 space-y-2">
            <p className="text-muted-foreground text-sm">
              사용자 활동 로그, 변경 이력 등을 정리하는 데 유용합니다.
            </p>
          </TabsContent>
          <TabsContent value="settings" className="mt-4 space-y-2">
            <p className="text-muted-foreground text-sm">
              설정 패널, 필터 등 다양한 시나리오에서 활용하세요.
            </p>
          </TabsContent>
        </Tabs>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>디자인 리소스</AccordionTrigger>
            <AccordionContent>
              Figma 라이브러리, 컬러 토큰, 타입 스케일 정보를 공유하세요.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>컴포넌트 가이드</AccordionTrigger>
            <AccordionContent>
              각 컴포넌트의 상태, 속성, 접근성 메모를 정리합니다.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <div className="space-y-3">
          <h3 className="font-semibold text-sm">연동 상태</h3>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>프로바이더</TableHead>
                <TableHead>상태</TableHead>
                <TableHead className="text-right">플랜</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {integrations.map((item) => (
                <TableRow key={item.provider}>
                  <TableCell>{item.provider}</TableCell>
                  <TableCell>{item.status}</TableCell>
                  <TableCell className="text-right">{item.plan}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}

const UITestPage = () => {
  return (
    <div className="space-y-12 pb-20">
      <UITestHero />
      <UITestForms />
      <UITestData />
    </div>
  );
};

export default UITestPage;
